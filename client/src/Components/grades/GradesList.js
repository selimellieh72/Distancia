import React, { useEffect, useContext } from "react";
import { authContext } from "../../providers/AuthContext";

import axios from "axios";
import CircularProgessIndicator from "../Core/CircularProgessIndicator";
import GradeCard from "./GradeCard";
import { ReactComponent as BoxSvg } from "../../assets/svg/box.svg";
import SearchBar from "../../Components/Core/SearchBar";

export default function GradesList(props) {
  const [searchTerm, setSearchTerm] = React.useState();
  const { isTeacher, discipline } = useContext(authContext)[0];
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      axios
        .get("/grades")
        .then(({ data }) => props.setGrades(data))
        .catch((e) => console.log(e));
    }
    return () => (isMounted = false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <SearchBar searchTerm={searchTerm} isGrades setSearchTerm={setSearchTerm} />

      {props.grades === null ? (
        <CircularProgessIndicator />
      ) : props.grades.length !== 0 ? (
        <div className="card-list">
          {props.grades
            ?.filter(
              (grade) =>
                !searchTerm ||
                (isTeacher &&
                  grade.title
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())) ||
                (!isTeacher &&
                  grade.teacher.discipline
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()))
            )
            .map((grade) => {
              return (
                <GradeCard
                  gradeMaterial={
                    isTeacher ? discipline : grade.teacher.discipline
                  }
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
          {isTeacher ? (
            <p className="list-empty__text">
              No Grades Found <br />
              Create your Grade
            </p>
          ) : (
            <p className="list-empty__text">
              No Grades Found <br />
              Join a Grade
            </p>
          )}
        </div>
      )}
    </>
  );
}
