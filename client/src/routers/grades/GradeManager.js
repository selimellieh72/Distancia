import React, { useState } from "react";

import GradeTable from "../../Components/grades/gradeManager/GradeTable";

import PageHeader from "../../Components/Core/PageHeader";

export default function GradeManager(props) {
  const { gradeId } = props.match.params;

  const [gradeTitle, setGradeTitle] = useState();

  return (
    <>
      <div className="grade-manager">
        <PageHeader title={gradeTitle} />
        <GradeTable
          gradeTitle={gradeTitle}
          setGradeTitle={setGradeTitle}
          gradeId={gradeId}
        />
      </div>
    </>
  );
}
