import React, { useState } from "react";
import { Tooltip } from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";

export default function GradeId(props) {
    const [copyText, setCopyText] = useState("Copy id");

    return (<div className="grade-ID" onMouseLeave={() => setCopyText("Copy id")}>
    <span>{props.id}</span>
    <Tooltip
      bgColor={copyText === "Copied" && "green"}
      label={copyText}
      placement="top"
      closeOnClick={false}
    >
      <CopyIcon
        ml="10px"
        cursor="pointer"
        onClick={() => {
          navigator.clipboard.writeText(props.id);
          setCopyText("Copied");
        }}
      />
    </Tooltip>
  </div>)
}