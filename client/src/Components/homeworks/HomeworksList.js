import React, { useEffect, useContext } from "react";
import axios from "axios";
import { authContext } from "../../providers/AuthContext";
import HomeworkCard from "./homeworkCard";
import CircularProgessIndicator from "../Core/CircularProgessIndicator";
import { ReactComponent as HomeworkSvg } from "../../assets/svg/homework.svg";
import Homework from "../../routers/homework/Homework";

export default function HomeworksList(props) {
  const isTeacher = useContext(authContext)[0].isTeacher;

  useEffect(() => {
    let isMounted = true;
    axios
      .get(
        `/homeworks?${props.gradeId ? `&grade=${props.gradeId}` : ""}${
          props.chapterId ? `&chapter=${props.chapterId}` : ""
        }`
      )
      .then((res) => {
        if (isMounted) {
          props.setHomeworksData(res.data);
        }
      });
    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (props.homeworks) {
    return props.homeworks.length !== 0 ? (
      props.homeworks
        .filter((homework) => {
          switch (props.homeworksFilter) {
            case "all":
              return true;
            case "done":
              return homework.isAccomplished;
            case "undone":
              return !homework.isAccomplished;
            case "expired":
              return homework.isExpired;
            case "notExpired":
              return !homework.isExpired;
            case "seen":
              return homework.hasSeen;
            case "notSeen":
              return !homework.seen;

            default:
              return true;
          }
        })
        .map((homework) => (
          <HomeworkCard
            gradeId={props.gradeId}
            chapterId={props.chapterId}
            key={homework._id}
            id={homework._id}
            title={homework.title}
            content={homework.content}
            teacherName={homework.grade.teacher.fullName}
            teacherDiscipline={homework.grade.teacher.discipline}
            isAccomplished={homework.isAccomplished}
            hasSeen={homework.hasSeen}
            dueDate={homework.dueDate}
            setHomeworksData={props.setHomeworksData}
            files={homework.files}
            acceptAnswers={homework.acceptAnswers}
            answers={homework.answers}
            isExpired={homework.isExpired}
          />
        ))
    ) : (
      <div className="list-empty">
        <HomeworkSvg />
        {!isTeacher ? (
          <p className="list-empty__text">No Homeworks Found</p>
        ) : (
          <p className="list-empty__text">
            No Homeworks Found <br />
            Add your homework
          </p>
        )}
      </div>
    );
  } else {
    return CircularProgessIndicator();
  }
}
