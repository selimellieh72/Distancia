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
  const { gradeId, chapterId } = props.match.params || {};

  return (
    <div>
      <Container maxW="container.lg" p="18px">
        <PageHeader
          title={
            gradeId ? (
              <span className="page-title">
                {homeworksData.chapterTitle ||
                  homeworksData.gradeTitle ||
                  "Homeworks"}
              </span>
            ) : (
              "Homeworks"
            )
          }
          addButton={
            isTeacher &&
            gradeId &&
            chapterId && (
              <HomeworkModal
                gradeId={gradeId}
                chapterId={chapterId}
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
          chapterId={chapterId}
          homeworks={homeworksData.homeworks}
        />
      </Container>
    </div>
  );
}
