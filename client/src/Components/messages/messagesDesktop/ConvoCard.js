import React from "react";
import { Avatar } from "@chakra-ui/react";
import { ReactComponent as ClassroomSvg } from "../../../assets/svg/multiple-users-silhouette.svg";
import UserAvatar from "../../User/UserAvatar";

export default function ConvoCard(props) {
  return (
    <div
      className="convo-card"
      onClick={() =>
        props.setCurrentChat({
          recieverName: props.userName,
          recieverId: props.gradeId ? undefined : props.userId,
          gradeId: props.gradeId,
          profile: props.profile,
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
        <UserAvatar external profile={props.profile} />
      )}
      <h1 className="convo-card__profile__name">
        {(props.gradeId ? "Grade: " : "") + props.userName}
      </h1>
    </div>
  );
}
