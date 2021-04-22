import { Server } from "socket.io";
import mongoose from "mongoose";
import Message from "./models/message.js";

const clients = [];

export default function (server, sessionMiddleware) {
  const io = new Server(server, { cors: { origin: true, credentials: true } });
  const nsp = io.of("/api/messages");
  nsp.use((socket, next) => sessionMiddleware(socket.request, {}, next));

  nsp.on("connection", (socket) => {
    const user = socket.request.session.passport?.user;

    if (user) {
      socket.on("getMessages", ({ secondUser, grade }, callback) => {
        if (secondUser) {
          const index = clients.findIndex(
            (client) => client.userId === user || client.socketId === socket
          );
          if (index > -1) {
            clients.splice(index, 1);
          }
          clients.push({
            userId: user,
            socketId: socket.id,
            room: secondUser || grade,
          });
        } else {
          socket.join(grade);
        }

        const userId = mongoose.Types.ObjectId(user);
        const query = secondUser
          ? {
              $and: [
                {
                  $or: [
                    { sender: userId },
                    { sender: mongoose.Types.ObjectId(secondUser) },
                  ],
                },
                {
                  $or: [
                    { reciever: userId },
                    { reciever: mongoose.Types.ObjectId(secondUser) },
                  ],
                },
              ],
            }
          : { grade };

        Message.find(query)
          .sort({ created_at: 1 })
          .populate(
            secondUser
              ? ""
              : {
                  path: "sender",
                  select: "fullName isTeacher",
                }
          )
          .exec(function (error, messages) {
            if (error) {
              callback({ error });
            } else {
              callback({});

              socket.emit(
                "messages",
                messages.map((message) => ({
                  ...message._doc,
                  isMe: userId.equals(message._doc.sender._id),
                }))
              );
            }
          });
      });
      socket.on("sendMessage", ({ reciever, text, grade }, callback) => {
        const message = new Message({ reciever, text, grade, sender: user });
        message.save(function (error, message) {
          if (error) {
            console.log(error);
            callback({ error });
          }
          if (reciever) {
            const recieverSocketId = clients.find(
              (c) => c.userId === reciever && c.room === (user || grade)
            )?.socketId;
            if (recieverSocketId) {
              nsp.to(recieverSocketId).emit("message", message);
            }
          } else {
            message
              .populate({
                path: "sender",
                select: `fullName ${grade ? "isTeacher" : ""}`,
              })
              .execPopulate((error, message) => {
                if (error) {
                  callback({ error });
                } else {
                  socket.broadcast.to(grade).emit("message", message);
                }
              });
          }
          callback({ message });
        });
      });
      socket.on("disconnect", () => {
        const userIndex = clients.findIndex(
          (client) => client.socketId === socket.id
        );
        if (userIndex > -1) {
          clients.splice(userIndex, 1);
        }
      });
    }
  });
}