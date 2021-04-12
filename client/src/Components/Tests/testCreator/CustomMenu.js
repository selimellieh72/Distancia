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
  var multipleChoice = false;
  var singleChoice = false;
  var text = true;
  const { setValue } = useForm();

  function handleMultipleChoice() {
    multipleChoice = true;
    singleChoice = false;
    text = false;
    console.log([multipleChoice, singleChoice, text]);
  }

  function handleSingleChoice() {
    multipleChoice = false;
    singleChoice = true;
    text = false;
    console.log([multipleChoice, singleChoice, text]);
  }

  function handleText() {
    multipleChoice = false;
    singleChoice = false;
    text = true;
    console.log([multipleChoice, singleChoice, text]);
  }

  function answerType() {
    if (handleMultipleChoice && handleSingleChoice === false) {
    }
  }

  props.getTypeValue(() => {
    setValue("multipleChoice", multipleChoice);
    setValue(singleChoice, singleChoice);
    setValue("text", text);
  });
  return (
    <>
      <Menu colorScheme="blue">
        <MenuButton mt="1.5rem" colorScheme="green" as={Button}>
          Answer Type <ChevronDownIcon />{" "}
        </MenuButton>
        <MenuList>
          <MenuItem onClick={handleMultipleChoice} color="#2b2b2b" minH="48px">
            <MultipleChoiceSvg className="answer-type__icon" /> Multiple choice
          </MenuItem>
          <hr className="answer-type__divider" />
          <MenuItem onClick={handleSingleChoice} color="#2b2b2b" minH="48px">
            <ChoiceSvg className="answer-type__icon" /> Single choice
          </MenuItem>
          <hr className="answer-type__divider" />
          <MenuItem onClick={handleText} color="#2b2b2b" minH="48px">
            <TextSvg className="answer-type__icon" /> Text choice
          </MenuItem>
          <hr className="answer-type__divider" />
        </MenuList>
      </Menu>
      {text && (
        <p className="choosen-type">
          <em>Text</em>
        </p>
      )}
      {multipleChoice && (
        <p className="choosen-type">
          <em>Multiple Choice</em>
        </p>
      )}
      {singleChoice && (
        <p className="choosen-type">
          <em>Single Choice</em>
        </p>
      )}
    </>
  );
}
