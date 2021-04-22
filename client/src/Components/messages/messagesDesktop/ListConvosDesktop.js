import React from "react";
import ConvoCard from "./ConvoCard";

export default function ListConvosDesktop(props) {
  return (
    <div className="list-convos-desktop">
      {props.chats?.map((chat) => (
        <div key={chat._id}>
          <ConvoCard
            gradeId={chat.gradeId}
            setCurrentChat={props.setCurrentChat}
            userName={chat.fullName}
            userId={chat._id}
          />
          <hr />
        </div>
      ))}
    </div>
  );
}
