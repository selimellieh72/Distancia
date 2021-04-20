import React from "react";
import Header from "../../Components/header/Header";
import GradeTable from "../../Components/grades/gradeManager/GradeTable";
import { Heading } from "@chakra-ui/layout";
import BackIcon from "../../Components/Core/BackIcon";
import PageHeader from "../../Components/Core/PageHeader";

export default function GradeManager(props) {
  const { gradeId } = props.match.params;
  return (
    <>
      <div className="grade-manager">
        <PageHeader title="GradeManage" />
        <GradeTable gradeId={gradeId} />
      </div>
    </>
  );
}
