import React, { useEffect, useState } from "react";
import axios from "axios";
import HomeworkTableCard from "./HomeworkTableCard";

export default function HomeworkTableList(props) {
  useEffect(
    () =>
      axios.get(`/homeworks/${props.homeworkId}`).then((res) => {
        return props.setHomework({
          answers: res.data.answers,
          students: res.data.grade.students,
          title: res.data.title,
          accomplishedUsers: res.data.accomplishedUsers,
        });
      }),
    []
  );

  return (
    <>
      {props.homework.students?.map((student) => (
        <HomeworkTableCard
          studentName={student.fullName}
          answerFileId={
            props.homework.answers?.filter(
              (answer) => answer.student === student._id
            )[0]?.fileId
          }
          hasAccomplished={props.homework.accomplishedUsers.includes(
            student._id
          )}
        />
      ))}
    </>
  );
}
