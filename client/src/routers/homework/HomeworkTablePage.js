import React, { useState, useContext } from "react";
import { authContext } from "../../providers/AuthContext";
import { useLocation } from "react-router-dom";
import { Heading, Flex, Container, Button } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import Homeworktable from "../../Components/homeworks/HomeworkTable";

import BackIcon from "../../Components/Core/BackIcon";
import HomeworkDrawer from "../../Components/homeworks/HomeworkDrawer";
import PageHeader from "../../Components/Core/PageHeader";

export default function HomeworkTablePage(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { discipline, fullName } = useContext(authContext)[0];

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

  backPath = (backPath ?? "") + "/homeworks";

  return (
    <>
      <Container maxW="container.lg" p="18px">
        <PageHeader
          homeworkDrawer={
            <>
              <Button className="page-header__icon__button" mr="0.5rem" onClick={onOpen} colorScheme="blue">
                Details
              </Button>{" "}
              <HomeworkDrawer
                acceptAnswers={homework.acceptAnswers}
                isExpired={homework.isExpired}
                files={homework.files}
                dueDate={homework.dueDate}
                teacherName={fullName}
                teacherDiscipline={discipline}
                homeworkData={homework}
                setHomeworkData={setHomework}
                isOpen={isOpen}
                onClose={onClose}
                id={homework.id}
              />
            </>
          }
          pathName={backPath}
          title={homework.title}
        />
        <Homeworktable
          homeworkId={homeworkId}
          homework={homework}
          setHomework={setHomework}
        />
      </Container>
    </>
  );
}
