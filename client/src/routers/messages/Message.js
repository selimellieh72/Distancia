import React from "react";

import Header from "../../Components/header/Header";
import { Link } from "react-router-dom";
import MessageMain from "../../Components/messages/MessageMain";

export default function Messages(props) {
  const { gradeId } = props.match.params;

  return (
    <>
      <MessageMain gradeId={gradeId} />
    </>
  );
}
