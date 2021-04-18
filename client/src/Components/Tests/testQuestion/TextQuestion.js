import React from "react";
import { Textarea } from "@chakra-ui/react";

export default function TextQuestion() {
  return (
    <Textarea
      height="150px"
      className="test-input__question"
      placeholder="Answer"
      
      focusBorderColor="#2b2b2b"
      borderColor="gray"
    />
  );
}
