import React, { useState } from "react";
import {
  Input,
  Radio,
  Checkbox,
  CheckboxGroup,
  Stack,
  Flex,
} from "@chakra-ui/react";
import { ReactComponent as AddSvg } from "../../../../assets/svg/plus.svg";
import LessDialog from "../../../Core/LessDialog";

export default function MultipleChoice() {
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
      </CheckboxGroup>
    </Stack>
  );
}
