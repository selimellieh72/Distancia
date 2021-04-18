import { Heading } from "@chakra-ui/layout";
import React from "react";
import TestQuestionList from "../../Components/Tests/testQuestion/TestQuestionList";

export default function TakeQuizz() {
  return (
    <>
      <div className="test-creator">
        <div className="test-creator__heading">
          <Heading as="h1" className="test-input__title">
            Title
          </Heading>
          <hr className="test-creator__heading__divider" />
        </div>
        <TestQuestionList />
      </div>
    </>
  );
}
