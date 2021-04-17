import React, { useState } from "react";
import {
  Input,
  Radio,
  RadioGroup,
  Stack,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";
import { ReactComponent as AddSvg } from "../../../../assets/svg/plus.svg";
import LessDialog from "../../../Core/LessDialog";

export default function SingleChoice() {
  const [value, setValue] = useState(3);
  const [optionNumber, addOption] = useState(0);
  return (
    <Stack mt="2rem">
      <RadioGroup>
        <Flex alignItems="center" mb="0.75rem">
          <Radio
            borderColor="#2b2b2b"
            colorScheme="blackAlpha"
            value="1"
            size="lg"
            mr="1.2rem"
          />
          <Input
            className="test-input__question"
            placeholder="Option 1"
            borderColor="gray"
            focusBorderColor="#2b2b2b"
          />
          <LessDialog />
        </Flex>
        <Flex alignItems="center" mb="0.75rem">
          <Radio
            borderColor="#2b2b2b"
            colorScheme="blackAlpha"
            value="2"
            size="lg"
            mr="1.2rem"
          />
          <Input
            className="test-input__question"
            placeholder="Option 1"
            borderColor="gray"
            focusBorderColor="#2b2b2b"
          />
          <LessDialog />
        </Flex>
        <Flex alignItems="center" mb="0.75rem">
          <Radio
            borderColor="#2b2b2b"
            colorScheme="blackAlpha"
            value="3"
            size="lg"
            mr="1.2rem"
          />
          <Input
            className="test-input__question"
            placeholder="Option 1"
            borderColor="gray"
            focusBorderColor="#2b2b2b"
          />
          <LessDialog />
        </Flex>
        {[...Array(optionNumber)].map((e, i) => (
          <Flex alignItems="center" mb="0.75rem">
            <Radio
              borderColor="#2b2b2b"
              colorScheme="blackAlpha"
              value={value.toString()}
              size="lg"
              mr="1.2rem"
            />
            <Input
              className="test-input__question"
              placeholder="Option 1"
              borderColor="gray"
              focusBorderColor="#2b2b2b"
            />
            <LessDialog />
          </Flex>
        ))}

        <AddSvg
          onClick={() => {
            addOption(optionNumber + 1);
            setValue(value + 1);
          }}
          className="add option"
        />
      </RadioGroup>
    </Stack>
  );
}
