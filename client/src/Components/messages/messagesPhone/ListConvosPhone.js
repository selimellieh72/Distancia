import React from "react";
import ConvoCardPhone from "./ConvoCardPhone";
import BackIcon from "../../Core/BackIcon";
import { Input, InputLeftElement, InputGroup } from "@chakra-ui/input";
import CircularProgessIndicator from "../../Core/CircularProgessIndicator";
import { Search2Icon } from "@chakra-ui/icons";

export default function ListConvosPhone(props) {
  console.log(`currentChat: ${props.currentChat}`);
  return (
    <div className="messages-conversations">
      <div className="back-button-convos">
        <BackIcon pathName="/grades" />
        <h1 className="messages-chat__title">Chats</h1>
        <InputGroup>
          <InputLeftElement
            height="30px"
            ml="1.5rem"
            pointerEvents="none"
            children={<Search2Icon color="#2b2b2b" />}
          />
          <Input
            placeholder="Search..."
            focusBorderColor="#2b2b2b"
            ml="1.5rem"
            height="30px"
            borderRadius="15px"
            borderColor="#2b2b2b"
          />
        </InputGroup>
      </div>
      <hr />
      {props.chats && props.chats.length > 0 ? (
        props.chats?.map((chat) => (
          <ConvoCardPhone
            gradeId={chat.gradeId}
            key={chat._id}
            setCurrentChat={props.setCurrentChat}
            userName={chat.fullName}
            userId={chat._id}
          />
        ))
      ) : (
        <CircularProgessIndicator />
      )}
    </div>
  );
}
