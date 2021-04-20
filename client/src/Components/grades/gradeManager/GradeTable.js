import React, { useState } from "react";
import axios from "axios";
import GradeTablePending from "./GradeTablePending";
import GradeTableAttendance from "./GradeTableAttendance";

export default function GradeTable(props) {
  const [students, setStudents] = useState(props.students);
  const deleteStudent = (studentId) =>
    axios
      .patch(`/grades/${props.gradeId}?removeStudent=${studentId}`)
      .then((res) =>
        setStudents((prevStudents) =>
          prevStudents.filter((student) => student._id !== studentId)
        )
      );
  return (
    <>
      <GradeTablePending deleteStudent={deleteStudent} students={students} />

      <GradeTableAttendance deleteStudent={deleteStudent} students={students} />
    </>
  );
}
