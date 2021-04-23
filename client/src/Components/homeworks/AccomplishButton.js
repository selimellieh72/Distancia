import React from "react";
import { Button } from "@chakra-ui/react";

export default function AccomplishButton(props) {
  return (
    <Button
      size="lg"
      margin={[0, "auto", 2]}
      position="relative"
      borderColor="#2b2b2b"
      colorScheme="green"
      disabled={props.disabled}
      onClick={props.onClick}
    >
      Accomplish
    </Button>
  );
}
