import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Heading, Flex, Container } from "@chakra-ui/react";

import Homeworktable from "../../Components/homeworks/HomeworkTable";

import BackIcon from "../../Components/Core/BackIcon";

export default function HomeworkTablePage(props) {
  const [homework, setHomework] = useState({});
  const { homeworkId } = props.match.params;
  const { chapterId, gradeId } = useLocation().state || {};

  let backPath;
  if (gradeId) {
    backPath = "/grades/" + gradeId;
    if (chapterId) {
      backPath = backPath + "/chapter/" + chapterId;
    }
  }

  backPath = backPath ?? "" + "/homeworks";

  return (
    <>
      <Container maxW="container.lg" p="18px">
        <Flex minW="300px" justifyContent="space-between">
          <Heading as="h1">
            <BackIcon pathName={backPath} />
            {homework.title}
          </Heading>
        </Flex>
        <Homeworktable
          homeworkId={homeworkId}
          homework={homework}
          setHomework={setHomework}
        />
      </Container>
    </>
  );
}
