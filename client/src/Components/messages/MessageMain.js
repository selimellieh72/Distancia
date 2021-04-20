import React from "react";
import MessageMainPhone from "./messagesPhone/MessageMainPhone";
import { useMediaPredicate } from "react-media-hook";
import MessageMainDesktop from "./messagesDesktop/MessageMainDesktop";

export default function MessageMain() {
  const lessThan660 = useMediaPredicate("(max-width: 660px)");

  return (
    <div className="main-messages">
      {lessThan660 ? <MessageMainPhone /> : <MessageMainDesktop />}
    </div>
  );
}
