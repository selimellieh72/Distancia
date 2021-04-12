import React from "react";
import { Flex, CircularProgress } from "@chakra-ui/react";

export default function CircularProgessIndicator() {
  return (
    <Flex h="100%" justify="center" align="center">
      <CircularProgress isIndeterminate color="green.300" />
    </Flex>
  );
}
