import React from "react";
import { Flex, Avatar, Icon } from "@chakra-ui/react";
import { ReactComponent as ClassroomSvg } from "../../../assets/svg/multiple-users-silhouette.svg";
import UserAvatar from "../../User/UserAvatar";

export default function ConvoCardPhone(props) {
  console.log(props.profile);
  return (
    <div
      onClick={() => {
        props.setCurrentChat({
          recieverName: props.userName,
          recieverId: props.gradeId ? undefined : props.userId,
          gradeId: props.gradeId,
          profile: props.profile,
        });
      }}
      className="messages-conversation"
    >
      <Flex padding="1.5rem" justifyContent="start" alignItems="center">
        {props.gradeId ? (
          <Avatar
            padding="0.5rem"
            bg="#2b2b2b"
            icon={<ClassroomSvg fill="white" />}
          />
        ) : (
          <UserAvatar profile={props.profile} external bg="#2b2b2b" />
        )}
        <div className="messages-profile__info">
          <p className="messages-profile__username">
            {(props.gradeId ? "Grade: " : "") + props.userName}
          </p>
        </div>
      </Flex>
    </div>
  );
}
