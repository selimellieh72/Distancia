import React, { useEffect, useContext } from "react";
import axios from "axios";
import { authContext } from "../../providers/AuthContext";
import HomeworkCard from "./homeworkCard";
import CircularProgessIndicator from "../Core/CircularProgessIndicator";
import { ReactComponent as HomeworkSvg } from "../../assets/svg/homework.svg"

export default function HomeworksList(props) {
  const isTeacher = useContext(authContext)[0].isTeacher;

  useEffect(() => {
    let isMounted = true;
    axios
      .get(
        `http://localhost:5000/homeworks${
          props.gradeId ? `?grade=${props.gradeId}` : ""
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
  }, []);
  if (props.homeworks) {
    return props.homeworks.length !== 0 ? (
      props.homeworks.map((homework) => (
        <HomeworkCard
          gradeId={props.gradeId}
          key={homework._id}
          id={homework._id}
          title={homework.title}
          content={homework.content}
          teacherName={homework.grade.teacher.fullName}
          teacherDiscipline={homework.grade.teacher.discipline}
          isAccomplished={homework.isAccomplished}
          dueDate={homework.dueDate}
          setHomeworks={props.setHomeworks}
          fileIds={homework.fileIds}
          acceptAnswers={homework.acceptAnswers}
          answers={homework.answers}
        />
      ))
    ) : (
      <div className="list-empty">
        <HomeworkSvg />
        {!isTeacher ? (
          <p className="list-empty__text">
            No Homeworks Found
          </p>
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
