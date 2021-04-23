import React, { useContext, useEffect, useState } from "react";
import { Container, IconButton, Tooltip } from "@chakra-ui/react";

import LectureList from "../../Components/Lecture/LectureList";
import { authContext } from "../../providers/AuthContext";
import LectureModal from "../../Components/Lecture/LectureModal";
import { AddIcon } from "@chakra-ui/icons";
import PageHeader from "../../Components/Core/PageHeader";
import { FaTrash } from "react-icons/fa";

export default function Lecture(props) {
  const isTeacher = useContext(authContext)[0].isTeacher;
  const { gradeId, chapterId } = props.match.params || {};
  const [lecturesData, setLecturesData] = useState({});
  const [deleteState, setDeleteState] = useState(false);

  useEffect(
    () =>
      (!lecturesData.lectures || lecturesData.lectures.length <= 0) &&
      setDeleteState(false),
    [lecturesData]
  );
  return (
    <>
      <Container maxW="container.lg" p="18px">
        <PageHeader
          gradeId={gradeId}
          chapterTitle={lecturesData?.chapterTitle}
          chapterId={chapterId}
          deleteButton={
            <Tooltip label="Delete lectures" bg="red">
              <div
                onClick={() => {
                  if (
                    !lecturesData.lectures ||
                    lecturesData.lectures.length <= 0
                  ) {
                    return;
                  }
                  setDeleteState(!deleteState);
                }}
                className={
                  deleteState
                    ? "page-header__icon__delete page-header__icon__delete__active"
                    : "page-header__icon__delete"
                }
              >
                <IconButton
                  bg="none"
                  className="page-header__icon__button"
                  icon={<FaTrash />}
                />
              </div>
            </Tooltip>
          }
          pathName="/grades"
          title={chapterId && lecturesData?.chapterTitle}
          addButton={
            isTeacher && (
              <LectureModal
                gradeId={gradeId}
                chapterId={chapterId}
                icon={AddIcon}
                setLecturesData={setLecturesData}
                button
              />
            )
          }
        />

        <LectureList
          isTeacher={isTeacher}
          lecturesData={lecturesData}
          setLecturesData={setLecturesData}
          gradeId={gradeId}
          chapterId={chapterId}
          deleteState={deleteState}
        />
      </Container>
    </>
  );
}
