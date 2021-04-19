import React from "react";

import HomeworkTableList from "./HomeworkTableList";

export default function Homeworktable(props) {
  return (
    <HomeworkTableList
      homeworkId={props.homeworkId}
      homework={props.homework}
      setHomework={props.setHomework}
    />
  );
}
