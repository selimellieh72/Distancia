import { Button, Input, Flex, useDisclosure } from "@chakra-ui/react";
import React from "react";
import Header from "../../Components/header/Header";
import SaveExitButton from "../../Components/Tests/testCreator/SaveExitButton";
import TestSectionList from "../../Components/Tests/testCreator/TestSectionList";
import { useMediaPredicate } from "react-media-hook";

export default function CreateTest() {
  const biggerThan500 = useMediaPredicate("(min-width: 500px)");

  return (
    <>
      <div className="test-creator">
        <div className="test-creator__heading">
          <Input
            size="lg"
            className="test-input__title"
            placeholder="Title"
            variant="none"
            fontWeight="bold"
            fontSize="1.5rem"
            textAlign="center"
          />
          <hr className="test-creator__heading__divider" />
        </div>
        <TestSectionList />

        <Flex mt="1.5rem" justifyContent="space-around" alignItems="center">
          <Button mt="1rem" className="cancel-button" colorScheme="red">
            Cancel
          </Button>
          <SaveExitButton />
          <Button mt="1rem" className="publish-button" colorScheme="blue">
            Publish
          </Button>
        </Flex>
      </div>
    </>
  );
}
