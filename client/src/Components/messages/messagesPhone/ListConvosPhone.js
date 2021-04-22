import React from "react";
import ConvoCardPhone from "./ConvoCardPhone";
import BackIcon from "../../Core/BackIcon";
import CircularProgessIndicator from "../../Core/CircularProgessIndicator";

export default function ListConvosPhone(props) {
  console.log(`currentChat: ${props.currentChat}`);
  return (
    <div className="messages-conversations">
      <div className="back-button-convos">
        <BackIcon pathName="/grades" />
      </div>
      <hr />
      {props.chats && props.chats.length > 0 ? (
        props.chats?.map((chat) => (
          <ConvoCardPhone
            gradeId={chat.gradeId}
            key={chat._id}
            setCurrentChat={props.setCurrentChat}
            userName={chat.fullName}
            userId={chat._id}
          />
        ))
      ) : (
        <CircularProgessIndicator />
      )}
    </div>
  );
}
