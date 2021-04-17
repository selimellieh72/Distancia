import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../../Components/header/Header";
import GradeTable from "../../Components/grades/gradeManager/GradeTable";
import { Heading } from "@chakra-ui/layout";
import BackIcon from "../../Components/Core/BackIcon";

export default function GradeManager() {
  const { students, gradeId } = useLocation().state;

  return (
    <>
      <div className="grade-manager">
        <Heading>
          <BackIcon pathName="/grades" />
          GradeName
        </Heading>
        <GradeTable students={students} gradeId={gradeId} />
      </div>
    </>
  );
}
