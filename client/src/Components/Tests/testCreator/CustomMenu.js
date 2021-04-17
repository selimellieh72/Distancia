import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Input,
  Textarea,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { ReactComponent as ChoiceSvg } from "../../../assets/svg/choice.svg";
import { ReactComponent as MultipleChoiceSvg } from "../../../assets/svg/multipleChoice.svg";
import { ReactComponent as TextSvg } from "../../../assets/svg/text.svg";

export default function CustomMenu(props) {
  return (
    <>
      <Menu colorScheme="blue">
        <MenuButton mt="1.5rem" colorScheme="green" as={Button}>
          Answer Type <ChevronDownIcon />{" "}
        </MenuButton>
        <MenuList>
          <MenuItem
            onClick={() => props.setQuestionType("multipleChoice")}
            color="#2b2b2b"
            minH="48px"
          >
            <MultipleChoiceSvg className="answer-type__icon" /> Multiple choice
          </MenuItem>
          <hr className="answer-type__divider" />
          <MenuItem
            onClick={() => props.setQuestionType("singleChoice")}
            color="#2b2b2b"
            minH="48px"
          >
            <ChoiceSvg className="answer-type__icon" /> Single choice
          </MenuItem>
          <hr className="answer-type__divider" />
          <MenuItem
            onClick={() => props.setQuestionType("text")}
            color="#2b2b2b"
            minH="48px"
          >
            <TextSvg className="answer-type__icon" /> Text choice
          </MenuItem>
          <hr className="answer-type__divider" />
        </MenuList>
      </Menu>
      {props.questionType ===
        "text" &&(
          <p className="choosen-type">
            <em>Text</em>
          </p>
        )}
      {props.questionType === "multipleChoice" && (
        <p className="choosen-type">
          <em>Multiple Choice</em>
        </p>
      )}
      {props.questionType ===
        "singleChoice" &&(
          <p className="choosen-type">
            <em>Single Choice</em>
          </p>
        )}
    </>
  );
}
