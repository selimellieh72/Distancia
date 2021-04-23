import React, { useState } from "react";
import ConvoCardPhone from "./ConvoCardPhone";
import BackIcon from "../../Core/BackIcon";

import CircularProgessIndicator from "../../Core/CircularProgessIndicator";

import SearchBar from "../../Core/SearchBar";

export default function ListConvosPhone(props) {
  const [searchTerm, setSearchTerm] = useState();
  return (
    <div className="messages-conversations">
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
            <ConvoCardPhone
              profile={chat.profile}
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
