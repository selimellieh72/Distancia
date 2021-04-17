import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../../Components/header/Header";
import GradeTable from "../../Components/grades/gradeManager/GradeTable";

export default function GradeManager() {
  const { students, gradeId } = useLocation().state;

  return (
    <>
      <div className="grade-manager">
        <h1>GradeName</h1>
        <GradeTable students={students} gradeId={gradeId} />
      </div>
    </>
  );
}
