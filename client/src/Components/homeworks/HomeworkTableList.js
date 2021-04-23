import React, { useEffect } from "react";
import axios from "axios";

import HomeworkTableCard from "./HomeworkTableCard";

export default function HomeworkTableList(props) {
  useEffect(
    () =>
      axios
        .get(`/homeworks/${props.homeworkId}`)
        .then((res) => props.setHomework(res.data)),
    []
  );

  const isExpired = new Date(props.homework.dueDate) < new Date();

  console.log(props.homework.dueDate);

  return (
    <>
      {props.homework?.grade?.students?.map((student) => (
        <HomeworkTableCard
          isExpired={isExpired}
          key={student._id}
          studentName={student.fullName}
          answerFileId={
            props.homework.answers?.filter(
              (answer) => answer.student === student._id
            )[0]?.fileId
          }
          hasAccomplished={props.homework.accomplishedUsers.includes(
            student._id
          )}
          lastSeen={
            props.homework.studentsSeen.find(
              ({ student: s }) => s === student._id
            )?.date
          }
        />
      ))}
    </>
  );
}
