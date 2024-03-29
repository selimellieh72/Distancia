import { Textarea } from "@chakra-ui/textarea";
import { authContext } from "../../providers/AuthContext";
import React, { useState, useContext } from "react";
import { ReactComponent as SendSvg } from "../../assets/svg/send-button.svg";
import { Avatar } from "@chakra-ui/avatar";
import { Flex } from "@chakra-ui/layout";
import Messages from "./Messages";
import axios from "axios";
import BackIcon from "../Core/BackIcon";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { ReactComponent as ClassroomSvg } from "../../assets/svg/multiple-users-silhouette.svg";
import UserAvatar from "../User/UserAvatar";
import { useMediaPredicate } from "react-media-hook";
export default function MessageConversation(props) {
  const [message, setMessage] = useState("");
  const lessThan660 = useMediaPredicate("(max-width: 660px)");
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
  };
  return (
    <>
      <div className={lessThan660?"small-messages":"messages"}>
        <div className="messages-header">
          <Flex
            // justifyContent="space-between"
            height="100%"
            alignItems="center"
          >
            {props.lessThan660 && (
              <ArrowBackIcon
                onClick={() => {
                  props.setCurrentChat({});
                }}
                className="white__arrow-back"
                mr="1rem"
              />
            )}
            <div className="receiver">
              <UserAvatar
                className="user_avatar"
                external
                profile={props.currentChat.profile}
                padding={props.currentChat.profile ? undefined : "0.5rem"}
                mr="1.5rem"
                name={
                  props.currentChat.gradeId
                    ? null
                    : props.currentChat.recieverName
                }
                bg="#2b2b2b"
                color="#fff"
                fontWeight="bold"
                icon={<ClassroomSvg fill="white" />}
              />
              <div className="receiver-info">
                {props.currentChat.gradeId ? (
                  <p className="receiver-name">
                    grade: {props.currentChat.recieverName}
                  </p>
                ) : (
                  <p className="receiver-name">
                    {props.currentChat.recieverName}
                  </p>
                )}
              </div>
            </div>
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
          <SendSvg
            style={{ cursor: message ? undefined : "not-allowed" }}
            onClick={sendMessage}
            className="send-icon"
          />
        </div>
      </div>
    </>
  );
}
