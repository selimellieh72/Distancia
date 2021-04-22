import React from "react";
import { Flex, Avatar } from "@chakra-ui/react";

export default function ConvoCardPhone(props) {
  return (
    <div
      onClick={() => {
        props.setCurrentChat({
          recieverName: props.userName,
          recieverId: props.gradeId ? undefined : props.userId,
          gradeId: props.gradeId ?? undefined,
        });
      }}
      className="messages-conversation"
    >
      <Flex paddingTop="1.5rem" justifyContent="center">
        <Avatar bg="#2b2b2b" />
        <div className="messages-profile__info">
          <p className="messages-profile__username">
            {(props.gradeId ? "Grade: " : "") + props.userName}
          </p>
        </div>
      </Flex>
    </div>
  );
}
