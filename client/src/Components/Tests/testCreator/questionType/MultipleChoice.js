import React, {useState} from "react";
import { Stack, Checkbox, Input } from "@chakra-ui/react";
import { ReactComponent as AddSvg } from "../../../../assets/svg/plus.svg";

export default function MultipleChoice() {
  const [value, setValue] = useState(3);
  const [optionNumber, addOption] = useState(3);
  return (
    <>
      <Stack mt="2rem">
      {[...Array(optionNumber)].map((e, i) => (
        <Checkbox size="lg" borderColor="#2b2b2b">
          <Input w="100%"
            className="test-input__question"
            placeholder="Option 1"
            borderColor="gray"
            focusBorderColor="#2b2b2b"
          />
        </Checkbox>))}
        
        <AddSvg
          onClick={() => {
            addOption(optionNumber + 1);
            setValue(value + 1);
          }}
          className="add option"
        />
      </Stack>
    </>
  );
}
