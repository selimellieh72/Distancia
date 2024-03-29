import React, { useContext, useEffect, useState, useRef } from "react";
import { authContext } from "../../providers/AuthContext";
import MessageMainPhone from "./messagesPhone/MessageMainPhone";
import { useMediaPredicate } from "react-media-hook";
import MessageMainDesktop from "./messagesDesktop/MessageMainDesktop";
import axios from "axios";
import io from "socket.io-client";

let socket;

export default function MessageMain(props) {
  const lessThan660 = useMediaPredicate("(max-width: 660px)");
  const { isTeacher } = useContext(authContext)[0];
  const [currentChat, setCurrentChat] = useState();
  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([]);

  const scrollRef = useRef();

  useEffect(() => {
    socket = io(axios.defaults.baseURL + "/messages", {
      withCredentials: true,
      transports: ["websocket"],
      upgrade: false,
    });

    socket.on("messages", (messages) => setMessages(messages));

    socket.on("message", (message) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          ...message,
          isMe: false,
        },
      ]);
    });
    axios
      .get(
        `/grades/${props.gradeId}?title=true${
          isTeacher ? "students=true" : "teacher=true"
        }`
      )
      .then((res) => {
        setChats((chats) => {
          const newChats = [
            {
              _id: props.gradeId,
              fullName: res.data.title,
              gradeId: props.gradeId,
            },
            ...chats,
          ];

          return newChats;
        });
        if (isTeacher) {
          setChats((chats) => {
            const newChats = [...chats, ...res.data.students];

            return newChats;
          });
        } else {
          setChats((chats) => {
            const newChats = [
              ...chats,
              {
                _id: res.data.teacher._id,
                fullName: res.data.teacher.fullName,
                profile: res.data.teacher.profile,
              },
            ];

            return newChats;
          });

          // setCurrentChat({
          //   recieverName: res.data.teacher.fullName,
          //   recieverId: res.data.teacher._id,
          // });
        }
      });
    return () => socket.off();
  }, []);

  useEffect(() => {
    if (currentChat?.recieverId || currentChat?.gradeId) {
      setMessages([]);
      socket?.emit(
        "getMessages",
        { secondUser: currentChat.recieverId, grade: currentChat.gradeId },
        ({ error }) => {}
      );
    }
  }, [currentChat]);

  useEffect(() => scrollRef.current?.scrollIntoView({ behavior: "smooth" }), [
    messages,
  ]);

  return (
    <div className="main-messages">
      {lessThan660 ? (
        <MessageMainPhone
          socket={socket}
          setCurrentChat={setCurrentChat}
          chats={chats}
          messages={messages}
          setMessages={setMessages}
          currentChat={currentChat}
          scrollRef={scrollRef}
          lessThan660={lessThan660}
        />
      ) : (
        <MessageMainDesktop
          socket={socket}
          setCurrentChat={setCurrentChat}
          chats={chats}
          messages={messages}
          setMessages={setMessages}
          currentChat={currentChat}
          scrollRef={scrollRef}
          setChats={setChats}
        />
      )}
    </div>
  );
}
