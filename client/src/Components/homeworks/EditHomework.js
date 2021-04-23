import React from "react";
import { EditIcon } from "@chakra-ui/icons";
import { Tooltip } from "@chakra-ui/react";
import HomeworkModal from "./HomeworkModal";

export default function EditHomework(props) {
  function myEditIcon(props) {
    return (
      <Tooltip label="Edit homework">
        <EditIcon
          className="homework-edit-icon"
          mr="1rem"
          size="50px"
          onClick={(e) => {
            e.stopPropagation();
            props.onClick(e);
          }}
        />
      </Tooltip>
    );
  }

  return (
    <HomeworkModal
      id={props.id}
      dueDate={props.dueDate}
      icon={myEditIcon}
      title={props.title}
      content={props.content}
      files={props.files}
      setHomeworkData={props.setHomeworkData}
      acceptAnswers={props.acceptAnswers}
    />
  );
}
