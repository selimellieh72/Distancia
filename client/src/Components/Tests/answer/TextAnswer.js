import React from "react";
import { Textarea } from "@chakra-ui/react";

export default function TextAnswer() {
  return (
    <Textarea
    isDisabled
      height="150px"
      className="test-input__question"
      placeholder="Answer"
      focusBorderColor="#2b2b2b"
      borderColor="gray"
    />
  );
}
