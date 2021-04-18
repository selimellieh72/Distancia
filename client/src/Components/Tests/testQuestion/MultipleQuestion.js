import React, { useState } from "react";
import { Checkbox, CheckboxGroup, Stack, Flex } from "@chakra-ui/react";

export default function MultipleQuestion() {
  const [value, setValue] = useState(3);
  const [optionNumber, addOption] = useState(3);
  return (
    <Stack mt="2rem">
      <CheckboxGroup>
        {[...Array(optionNumber)].map((e, i) => (
          <Flex alignItems="center" mb="0.75rem">
            <Checkbox
              borderColor="#2b2b2b"
              colorScheme="blackAlpha"
              value={value.toString()}
              size="lg"
              mr="1.2rem"
            />
            <span>Option</span>
          </Flex>
        ))}
      </CheckboxGroup>
      <span className="test-section__advice__message">*You can check more than one option</span>
    </Stack>
  );
}
