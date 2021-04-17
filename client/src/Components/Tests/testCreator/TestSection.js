import { Input, Textarea } from "@chakra-ui/react";
import React, { useState } from "react";
import CustomMenu from "./CustomMenu";
import { ReactComponent as AddSvg } from "../../../assets/svg/plus.svg";
import SingleChoice from "./questionType/SingleChoice";
import MultipleChoice from "./questionType/MultipleChoice";

export default function TestTextSection() {
  const [questionType, setQuestionType] = useState("text");
  const [value, setValue] = React.useState("1");
  const [optionNumber, setOptionNumber] = useState(3);

  return (
    <>
      <div className="test-section__creator">
        <Input
          maxW="350px"
          variant="flushed"
          borderColor="gray"
          focusBorderColor="#2b2b2b"
          className="test-input__question"
          size="lg"
          placeholder="Question Title"
        />

        <Textarea
          height="150px"
          className="test-input__question"
          placeholder="Question"
          mt="2rem"
          focusBorderColor="#2b2b2b"
          borderColor="gray"
        />

        {questionType === "singleChoice" && <SingleChoice />}
        {questionType === "multipleChoice" && <MultipleChoice />}
        <CustomMenu
          questionType={questionType}
          setQuestionType={setQuestionType}
        />
        {(questionType === "singleChoice" ||
          questionType === "multipleChoice") && (
          <p className="test-section__advice__message">
            Please check the correct answers to have an automatic correction for
            multiple and single choice questions
          </p>
        )}

        <div className="grade-picker">
          <p>Grade over:</p>
          <Input
            textAlign="center"
            borderColor="gray"
            height="30px"
            display="block"
            width="55px"
          />
        </div>
      </div>
    </>
  );
}
