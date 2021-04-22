import React from "react";
import { Avatar } from "@chakra-ui/react";
import { ReactComponent as ClassroomSvg } from "../../../assets/svg/multiple-users-silhouette.svg";

export default function ConvoCard(props) {
  return (
    <div
      className="convo-card"
      onClick={() =>
        props.setCurrentChat({
          recieverName: props.userName,
          recieverId: props.gradeId ? undefined : props.userId,
          gradeId: props.gradeId ?? undefined,
        })
      }
    >
      {props.gradeId ? (
        <Avatar
          padding="0.5rem"
          bg="#2b2b2b"
          icon={<ClassroomSvg fill="white" />}
        />
      ) : (
        <Avatar bg="#2b2b2b" />
      )}
      <h1 className="convo-card__profile__name">
        {(props.gradeId ? "Grade: " : "") + props.userName}
      </h1>
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
