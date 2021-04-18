import React, { useState, useContext } from "react";

import HomeworksList from "../../Components/homeworks/HomeworksList";
import { authContext } from "../../providers/AuthContext";
import { AddIcon } from "@chakra-ui/icons";
import { Container } from "@chakra-ui/react";
import PageHeader from "../../Components/Core/PageHeader.js";
import HomeworkModal from "../../Components/homeworks/HomeworkModal.js";

export default function Homework(props) {
  const [homeworksData, setHomeworksData] = useState({});
  const isTeacher = useContext(authContext)[0].isTeacher;
  const gradeId = props.match.params.id;

  return (
    <div>
      <Container maxW="container.lg" p="18px">
        <PageHeader
          title={
            gradeId ? (
              <span className="page-title">
                {isTeacher ? homeworksData.gradeTitle || "" : props.discipline}
              </span>
            ) : (
              "Homeworks"
            )
          }
          addButton={
            isTeacher &&
            gradeId && (
              <HomeworkModal
                gradeId={gradeId}
                setHomeworks={(setHomeworksCallback) => {
                  const homeworks = setHomeworksCallback(
                    homeworksData.homeworks
                  );
                  setHomeworksData({ ...homeworksData, homeworks });
                }}
                icon={AddIcon}
                button
              />
            )
          }
        />
        <HomeworksList
          setHomeworksData={setHomeworksData}
          gradeId={gradeId}
          homeworks={homeworksData.homeworks}
        />
      </Container>
    </div>
  );
}
