import { Input } from "@chakra-ui/input";
import { Textarea } from "@chakra-ui/textarea";
import React from "react";
import Header from "../../Components/header/Header";
import { ReactComponent as SendSvg } from "../../assets/svg/send-button.svg";
import { Avatar } from "@chakra-ui/avatar";
import { Flex } from "@chakra-ui/layout";

export default function MessageConversation() {
  return (
    <>
      <Header />
      <div className="messages">
        <div className="messages-header">
          <Flex
            justifyContent="space-between"
            height="100%"
            alignItems="center"
          >
            <div className="receiver">
              <Avatar
                mr="1.5rem"
                name="Pamela S. Albert"
                bg="#fff"
                color="#2b2b2b"
                fontWeight="bold"
              />
              <div className="receiver-info">
                <p className="receiver-name">Theo khalil</p>
                <p className="receiver-status">Physics Teacher</p>
              </div>
            </div>
            <div className="contacting-time">
              <p className="contacting-time__from">From 6:00 AM</p>
              <p className="contacting-time__until">Until 1:00 PM</p>
            </div>
          </Flex>
        </div>
        <div className="messages-body">
          <div className="message-holder right-sent">
            <span>Bonjour j'aurais une question une question. </span>{" "}
          </div>
          <div className="message-holder left-received">
            <span>
              Bonjour eleve je suis disponible pour repondre a vos questions.{" "}
            </span>{" "}
          </div>
        </div>
        <div className="messages-footer">
          <Textarea
            fontSize="md"
            className="messages-footer__input"
            backgroundColor="white"
            placeholder="Message"
            focusBorderColor="#2b2b2b"
            width="90%"
            borderWidth="3px"
            borderColor="#2b2b2b"
          />
          <SendSvg className="send-icon" />
        </div>
      </div>
    </>
  );
}
