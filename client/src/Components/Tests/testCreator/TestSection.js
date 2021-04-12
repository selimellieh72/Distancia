import { ChevronDownIcon } from "@chakra-ui/icons";
import { Input, Textarea, Radio, RadioGroup, Stack } from "@chakra-ui/react";
import React from "react";
import CustomMenu from "./CustomMenu";

export default function TestTextSection() {
  let setValue;
  const getTypeValue = (myTypeValue) => (setValue = myTypeValue);

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
        <CustomMenu getTypeValue={getTypeValue} />
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

export function TestMultipleSection() {
  let setValue;
  const getTypeValue = (myTypeValue) => (setValue = myTypeValue);

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

        <Stack mt="2rem">
          <Input
            className="test-input__question"
            placeholder="Option 1"
            borderColor="gray"
            focusBorderColor="#2b2b2b"
          />

          <Input
            className="test-input__question"
            placeholder="Option 2"
            borderColor="gray"
            focusBorderColor="#2b2b2b"
          />
          <Input
            className="test-input__question"
            placeholder="Option 3"
            borderColor="gray"
            focusBorderColor="#2b2b2b"
          />
        </Stack>

        <CustomMenu getTypeValue={getTypeValue} />
        <div className="grade-picker">
          <p>Grade over:</p>
          <Input
            borderColor="gray"
            height="30px"
            display="block"
            width="100px"
          />
        </div>
      </div>
    </>
  );
}
