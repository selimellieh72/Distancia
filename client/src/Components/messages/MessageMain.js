import React, { useContext, useEffect, useState, useRef } from "react";
import { authContext } from "../../providers/AuthContext";
import MessageMainPhone from "./messagesPhone/MessageMainPhone";
import { useMediaPredicate } from "react-media-hook";
import MessageMainDesktop from "./messagesDesktop/MessageMainDesktop";
import axios from "axios";
import io from "socket.io-client";
import Cookies from "js-cookie";

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
    });

    console.log(socket);

    socket.on("messages", (messages) => setMessages(messages));

    socket.on("message", (message) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: message.text, _id: message._id, isMe: false },
      ]);
    });
    axios
      .get(
        `/grades/${props.gradeId}?${
          isTeacher ? "students=true" : "teacher=true"
        }`
      )
      .then((res) => {
        console.log(res);
        if (isTeacher) {
          setChats(res.data.students);
        } else {
          setCurrentChat({
            recieverName: res.data.teacher.fullName,
            recieverId: res.data.teacher._id,
          });
        }
      });
    return () => socket.off();
  }, []);

  useEffect(() => {
    if (currentChat) {
      // axios.get(`/messages?user=${currentChat.recieverId}`).then((res) => {
      //   setMessages(res.data);
      // });
      setMessages([]);
      socket?.emit(
        "getMessages",
        { secondUser: currentChat.recieverId },
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
        <MessageMainPhone currentChat={currentChat} />
      ) : (
        <MessageMainDesktop
          socket={socket}
          setCurrentChat={setCurrentChat}
          chats={chats}
          messages={messages}
          setMessages={setMessages}
          currentChat={currentChat}
          scrollRef={scrollRef}
        />
      )}
    </div>
  );
}
