import React from "react";
import { Flex , Heading , } from "@chakra-ui/react";

export default function HeaderRoute(props) {
    return (<Flex minW="300px" justifyContent="space-between">
    <Heading as="h1">
      {" "}
      <BackIcon pathName="/grades" />
      {gradeId ? (
        <span className="grade-title">
          {homeworksData.gradeTitle || ""}
        </span>
      ) : (
        "Homeworks"
      )}
    </Heading>
    {props.modal}
    {/* {isTeacher && gradeId && (
      <HomeworkModal
        gradeId={gradeId}
        setHomeworks={(setHomeworksCallback) => {
          const homeworks = setHomeworksCallback(homeworksData.homeworks);
          setHomeworksData({ ...homeworksData, homeworks });
        }}
        icon={AddIcon}
        button
      />
    )} */}
  </Flex>)
}