import React from "react";
import ConvoCard from "./ConvoCard";
import BackIcon from "../../Core/BackIcon";
import CircularProgessIndicator from "../../Core/CircularProgessIndicator";
import { Heading } from "@chakra-ui/layout";
import { Input, InputLeftElement, InputGroup } from "@chakra-ui/input";
import { Search2Icon } from "@chakra-ui/icons";

export default function ListConvosDesktop(props) {
  return (
    <div className="list-convos-desktop">
      <div className="back-button-convos">
        <BackIcon pathName="/grades" />
        <h1 className="messages-chat__title">Chats</h1>
        <InputGroup
          onChange={({ target }) => {
            console.log(props.allChats);
            return props.setChats(
              props.allChats?.map((chat) =>
                chat.fullName.includes(target.value)
              )
            );
          }}
        >
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
          <div key={chat._id}>
            <ConvoCard
              gradeId={chat.gradeId}
              setCurrentChat={props.setCurrentChat}
              userName={chat.fullName}
              userId={chat._id}
            />
            <hr />
          </div>
        ))
      ) : (
        <CircularProgessIndicator />
      )}
    </div>
  );
}
