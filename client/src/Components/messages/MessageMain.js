import React, { useContext, useEffect, useState, useRef } from "react";
import { authContext } from "../../providers/AuthContext";
import MessageMainPhone from "./messagesPhone/MessageMainPhone";
import { useMediaPredicate } from "react-media-hook";
import MessageMainDesktop from "./messagesDesktop/MessageMainDesktop";
import axios from "axios";

export default function MessageMain(props) {
  const lessThan660 = useMediaPredicate("(max-width: 660px)");
  const { isTeacher } = useContext(authContext)[0];
  const [currentChat, setCurrentChat] = useState();
  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([]);

  const scrollRef = useRef();

  useEffect(
    () =>
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
        }),
    []
  );

  useEffect(() => {
    if (currentChat) {
      axios.get(`/messages?user=${currentChat.recieverId}`).then((res) => {
        setMessages(res.data);
      });
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
