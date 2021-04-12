import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Buttons,
} from "@chakra-ui/react";

export default function LectureForm() {
  return (
    <>
      <form>
      <FormControl mb="9px" isRequired>
          <FormLabel>Title:</FormLabel>
          <Input
            name="title"
           
          />
        </FormControl>
      </form>
    </>
  );
}
