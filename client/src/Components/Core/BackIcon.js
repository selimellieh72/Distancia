import React from "react";
import { useHistory } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";

export default function BackIcon(props) {
  const history = useHistory();
  return (
    <ArrowBackIcon
      className="arrow-back"
      style={{
        cursor: "pointer",
      }}
      onClick={() => history.push(props.pathName)}
      mr="1rem"
    />
  );
}
