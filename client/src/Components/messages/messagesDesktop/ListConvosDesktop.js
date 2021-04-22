import React from "react";
import ConvoCard from "./ConvoCard";
import BackIcon from "../../Core/BackIcon";
import { CircularProgress } from "@chakra-ui/progress";

export default function ListConvosDesktop(props) {
  return (
    <div className="list-convos-desktop">
      <div className="back-button-convos">
        <BackIcon pathName="/grades" />
      </div>
      <hr />
      {props.chats && props.chats.length > 0 ? (
        props.chats?.map((chat) => (
          <div key={chat._id}>
            <ConvoCard
              gradeId={chat.gradeId}
              setCurrentChat={props.setCurrentChat}
              userName={chat.fullName}
              userId={chat._id}
            />
            <hr />
          </div>
        ))
      ) : (
        <CircularProgress color="green"/>
      )}
    </div>
  );
}
