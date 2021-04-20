import React from "react";
import { Flex, Avatar } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function MessageMainPhone() {
  return (
    <div className="messages-conversations">
      <Link to="/messageconversations">
        <div className="messages-conversation">
          <Flex paddingTop="1.5rem" justifyContent="center">
            <Avatar bg="#2b2b2b" />
            <div className="messages-profile__info">
              <p className="messages-profile__username">Pamela S. Albert</p>
              <p className="messages-profile__status">Physics Teacher</p>
            </div>
          </Flex>
        </div>
      </Link>
    </div>
  );
}
