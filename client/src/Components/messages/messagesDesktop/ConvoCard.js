import React from "react";
import { authContext } from "../../../providers/AuthContext";
import { Avatar } from "@chakra-ui/react";

export default function ConvoCard(props) {
  return (
    <div
      className="convo-card"
      onClick={() =>
        props.setCurrentChat({
          recieverName: props.userName,
          recieverId: props.userId,
        })
      }
    >
      <Avatar />
      <h1 className="convo-card__profile__name">{props.userName}</h1>
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
