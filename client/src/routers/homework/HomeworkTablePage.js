import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Heading, Flex, Container } from "@chakra-ui/react";

import Header from "../../Components/header/Header";
import Homeworktable from "../../Components/homeworks/HomeworkTable";
import { ArrowBackIcon } from "@chakra-ui/icons";
import BackIcon from "../../Components/Core/BackIcon";

export default function HomeworkTablePage() {
  const { homeworkTitle, answers, gradeId } = useLocation().state;
  return (
    <>
      <Container maxW="container.lg" p="18px" minW="620px">
        <Flex minW="300px" justifyContent="space-between">
          <Heading as="h1">
            <BackIcon pathName={`homeworks/${gradeId || ""}`} />
            {homeworkTitle}
          </Heading>
        </Flex>
        <Homeworktable answers={answers} />
      </Container>
    </>
  );
}
