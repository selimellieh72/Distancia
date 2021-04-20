import React from "react";
import { Avatar } from "@chakra-ui/react";

export default function ConvoCard() {
  return (
    <div className="convo-card">
      <Avatar />
      <h1 className="convo-card__profile__name">student student</h1>
      {/* <div className="time-restriction">
            <span className="time-restriction__title">
                Allowed time
            </span>
            <span className="time-restriction__time">
                18:00
            </span>
        </div> */}
    </div>
  );
}
