import React from "react";

import MessageConversation from "../MessageConversation";
import ListConvosPhone from "./ListConvosPhone";

export default function MessageMainPhone(props) {
  const isChatting =
    props.currentChat && Object.keys(props.currentChat).length > 0;

  return (
    <>
      {isChatting ? (
        <MessageConversation
          socket={props.socket}
          messages={props.messages}
          setMessages={props.setMessages}
          currentChat={props.currentChat}
          scrollRef={props.scrollRef}
        />
      ) : (
        <ListConvosPhone
          chats={props.chats}
          setCurrentChat={props.setCurrentChat}
        />
      )}
    </>
  );
}
