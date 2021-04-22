import React from "react";
import ConvoCardPhone from "./ConvoCardPhone";
import BackIcon from "../../Core/BackIcon";

export default function ListConvosPhone(props) {
  console.log(`currentChat: ${props.currentChat}`)
  return (
    <div className="messages-conversations">
      <div className="back-button-convos">
        <BackIcon pathName="/grades" />
      </div>
      <hr />
      {props.chats?.map((chat) => (
        <ConvoCardPhone
          gradeId={chat.gradeId}
          key={chat._id}
          setCurrentChat={props.setCurrentChat}
          userName={chat.fullName}
          userId={chat._id}
        />
      ))}
    </div>
  );
}
