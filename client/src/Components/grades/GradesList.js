import React, { useEffect, useContext } from "react";
import { authContext } from "../../providers/AuthContext";
import { SettingsIcon } from "@chakra-ui/icons";
import axios from "axios";
import CircularProgessIndicator from "../Core/CircularProgessIndicator";
import GradeCard from "./GradeCard";
import { ReactComponent as BoxSvg } from "../../assets/svg/box.svg";

export default function GradesList(props) {
  const { isTeacher, discipline } = useContext(authContext)[0];
  useEffect(() => {
    axios
      .get("/grades")
      .then(({ data }) => {
        console.log(data);
        return props.setGrades(data);
      })
      .catch((e) => console.log(e));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return props.grades === null ? (
    <CircularProgessIndicator />
  ) : props.grades.length !== 0 ? (
    <div className="card-list">
      {props.grades.map((grade) => {
        return (
          <GradeCard
            gradeMaterial={isTeacher ? discipline : grade.teacher.discipline}
            setGrades={props.setGrades}
            title={grade.title}
            students={grade.students}
            key={grade._id}
            id={grade._id}
            linkRef={grade.ref && grade.ref}
            chapters={grade.chapters}
          />
        );
      })}
    </div>
  ) : (
    <div className="list-empty">
      <BoxSvg />
      {!isTeacher ? (
        <p className="list-empty__text">
          No Grades Found <br />
          Add Your grade
        </p>
      ) : (
        <p className="list-empty__text">
          No Grades Found <br />
          Join a Grade
        </p>
      )}
    </div>
  );
}
