import React from "react";
import ConvoCardPhone from "./ConvoCardPhone";

export default function ListConvosPhone(props) {
  return (
    <div className="messages-conversations">
      {props.chats?.map((chat) => (
        <ConvoCardPhone
          key={chat._id}
          setCurrentChat={props.setCurrentChat}
          userName={chat.fullName}
          userId={chat._id}
        />
      ))}
    </div>
  );
}
