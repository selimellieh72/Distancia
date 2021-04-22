import { Textarea } from "@chakra-ui/textarea";
import { authContext } from "../../providers/AuthContext";
import React, { useState, useContext } from "react";
import { ReactComponent as SendSvg } from "../../assets/svg/send-button.svg";
import { Avatar } from "@chakra-ui/avatar";
import { Flex } from "@chakra-ui/layout";
import Messages from "./Messages";
import axios from "axios";

export default function MessageConversation(props) {
  const [message, setMessage] = useState("");

  const { fullName, isTeacher } = useContext(authContext)[0];

  const sendMessage = () => {
    if (!message) {
      return;
    }

    props.socket.emit(
      "sendMessage",
      {
        reciever: props.currentChat.recieverId,
        grade: props.currentChat.gradeId,
        text: message,
      },
      ({ message, error }) => {
        if (!error) {
          props.setMessages((prevMessages) => [
            ...prevMessages,
            {
              text: message.text,
              isMe: true,
              _id: message._id,
              created_at: message.created_at,
              sender: {
                fullName: props.currentChat.gradeId ? fullName : undefined,
                isTeacher: props.currentChat.gradeId ? isTeacher : undefined,
              },
            },
          ]);
          setMessage("");
        }
      }
    );

    // axios
    //   .post("/messages", {
    //     reciever: props.currentChat.recieverId,
    //     text: message,
    //   })
    //   .then((res) => {
    //     props.setMessages((prevMessages) => [
    //       ...prevMessages,
    //       { text: res.data.text, isMe: true, _id: res.data._id },
    //     ]);
    //     setMessage("");
    //   });
  };
  return (
    <>
      <div className="messages">
        <div className="messages-header">
          <Flex
            justifyContent="space-between"
            height="100%"
            alignItems="center"
          >
            <div className="receiver">
              <Avatar
                mr="1.5rem"
                name={props.currentChat.recieverName}
                bg="#fff"
                color="#2b2b2b"
                fontWeight="bold"
              />
              <div className="receiver-info">
                <p className="receiver-name">
                  {props.currentChat.recieverName}
                </p>
                {/* <p className="receiver-status">Physics Teacher</p> */}
              </div>
            </div>
            {/* <div className="contacting-time">
              <p className="contacting-time__from">From 6:00 AM</p>
              <p className="contacting-time__until">Until 1:00 PM</p>
            </div> */}
          </Flex>
        </div>
        <Messages messages={props.messages} scrollRef={props.scrollRef} />
        <div className="messages-footer">
          <Textarea
            fontSize="md"
            className="messages-footer__input"
            backgroundColor="white"
            placeholder="Message"
            focusBorderColor="#2b2b2b"
            width="90%"
            borderWidth="3px"
            borderColor="#2b2b2b"
            value={message}
            onKeyPress={function (e) {
              if (e.key === "Enter") {
                e.preventDefault();
                sendMessage();
              }
            }}
            onChange={({ target }) => setMessage(target.value)}
          />
          <SendSvg onClick={sendMessage} className="send-icon" />
        </div>
      </div>
    </>
  );
}
