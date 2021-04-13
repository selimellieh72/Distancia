import { Avatar, Flex } from "@chakra-ui/react";
import React from "react";
import Header from "../../Components/header/Header";
import { Link } from "react-router-dom";

export default function Messages() {
  return (
    <>
      <Header />
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
        <div className="messages-conversation">
          <Flex paddingTop="1.5rem" justifyContent="center">
            <Avatar bg="#2b2b2b" name="Robert M. Layne" />
            <div className="messages-profile__info">
              <p className="messages-profile__username">Robert M. Layne</p>
              <p className="messages-profile__status">Sociology Teacher</p>
            </div>
          </Flex>
        </div>
        <div className="messages-conversation">
          <Flex paddingTop="1.5rem" justifyContent="center">
            <Avatar bg="#2b2b2b" name="Theo Khalil" />
            <div className="messages-profile__info">
              <p className="messages-profile__username">Orville K. Perkins</p>
              <p className="messages-profile__status">Maths Teacher</p>
            </div>
          </Flex>
        </div>
        <div className="messages-conversation">
          <Flex paddingTop="1.5rem" justifyContent="center">
            <Avatar bg="#2b2b2b" name="Theo Khalil" />
            <div className="messages-profile__info">
              <p className="messages-profile__username">Brigitte D. Roger</p>
              <p className="messages-profile__status">English Teacher</p>
            </div>
          </Flex>
        </div>
        <div className="messages-conversation">
          <Flex paddingTop="1.5rem" justifyContent="center">
            <Avatar bg="#2b2b2b" name="Theo Khalil" />
            <div className="messages-profile__info">
              <p className="messages-profile__username">Donna G. Parker</p>
              <p className="messages-profile__status">Philosophy Teacher</p>
            </div>
          </Flex>
        </div>
      </div>
    </>
  );
}
