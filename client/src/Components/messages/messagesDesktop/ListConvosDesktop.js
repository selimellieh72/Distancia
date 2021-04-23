import React, { useState } from "react";
import ConvoCard from "./ConvoCard";
import BackIcon from "../../Core/BackIcon";
import CircularProgessIndicator from "../../Core/CircularProgessIndicator";
import ConvoCardPhone from "../messagesPhone/ConvoCardPhone";
import SearchBar from "../../Core/SearchBar";

export default function ListConvosDesktop(props) {
  const [searchTerm, setSearchTerm] = useState();

  return (
    <div className="list-convos-desktop">
      <div className="back-button-convos">
        <BackIcon pathName="/grades" />
        <h1 className="messages-chat__title">Chats</h1>
        <SearchBar setSearchTerm={setSearchTerm} />
      </div>
      <hr />
      {props.chats && props.chats.length > 0 ? (
        props.chats
          ?.filter(
            (chat) =>
              !searchTerm ||
              ((chat.gradeId ? "Grade: " : "") + chat.fullName)
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
          )
          .map((chat) => (
            <div key={chat._id}>
              {
                <ConvoCard
                  profile={chat.profile}
                  gradeId={chat.gradeId}
                  setCurrentChat={props.setCurrentChat}
                  userName={chat.fullName}
                  userId={chat._id}
                />
              }

              <hr />
            </div>
          ))
      ) : (
        <CircularProgessIndicator />
      )}
    </div>
  );
}
