import { Container, Heading, Center, Flex } from "@chakra-ui/react";
import React from "react";
import BackIcon from "../../Components/Core/BackIcon";
import AnswerDrawer from "../../Components/Tests/answer/AnswerDrawer";
import AnswerStudentList from "../../Components/Tests/answer/AnswerStudentList";

export default function SeeAnswers() {
  return (
    <>
      <Container
        alignItems="center"
        justifyContent="space-between"
        display="flex"
        maxW="container.lg"
        p="18px"
      >
        <BackIcon pathName="/tests" />
        <AnswerDrawer />
      </Container>
      <Flex textAlign="center" flexDir="column">
        <Heading as="h1" display="inline" className="test-input__title">
          Title
        </Heading>
        <hr className="test-creator__heading__divider" />
      </Flex>
      <AnswerStudentList />
    </>
  );
}
