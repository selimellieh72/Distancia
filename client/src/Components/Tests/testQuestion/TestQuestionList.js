import { Button, Center } from "@chakra-ui/react";
import React from "react";
import TestSectionAnswer from "./TestSectionQuestion";

export default function TestQuestionList() {
  return (
    <div className="test-lists">
      <TestSectionAnswer />
      <Center>
        <Button colorScheme="green">Submit</Button>
      </Center>
    </div>
  );
}
