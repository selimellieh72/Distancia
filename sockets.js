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

        if (secondUser) {
          const userId = mongoose.Types.ObjectId(user);
          const secondUserId = mongoose.Types.ObjectId(secondUser);
          Message.find({
            $and: [
              { $or: [{ sender: userId }, { sender: secondUserId }] },
              { $or: [{ reciever: userId }, { reciever: secondUserId }] },
            ],
          })
            .sort({ created_at: 1 })
            .exec(function (error, messages) {
              if (error) {
                callback({ error });
              } else {
                callback({});
                socket.emit(
                  "messages",
                  messages.map((message) => ({
                    ...message._doc,
                    isMe: userId.equals(message._doc.sender),
                  }))
                );
              }
            });
        }
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

            callback({ message });
          }
        });
      });
      socket.on("disconnect", () => {
        console.log("User disconnected");
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
