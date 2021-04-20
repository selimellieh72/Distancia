import React, { useState } from "react";
import axios from "axios";
import GradeTablePending from "./GradeTablePending";
import GradeTableAttendance from "./GradeTableAttendance";

export default function GradeTable(props) {
  const [students, setStudents] = useState();
  return (
    <>
      <GradeTablePending setStudents={setStudents} gradeId={props.gradeId} />

      <GradeTableAttendance
        students={students}
        setStudents={setStudents}
        gradeTitle={props.gradeTitle}
        setGradeTitle={props.setGradeTitle}
        gradeId={props.gradeId}
      />
    </>
  );
}
