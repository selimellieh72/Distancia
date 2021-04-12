import React from "react";
import { EditIcon } from "@chakra-ui/icons";
import HomeworkModal from "./HomeworkModal";
import HomeworksList from "./HomeworksList";
export default function EditHomework(props) {
  function myEditIcon(props) {
    return (
      <EditIcon
        mr="1rem"
        size="50px"
        onClick={(e) => {
          e.stopPropagation();
          props.onClick(e);
        }}
      />
    );
  }
  return (
    <HomeworkModal
      id={props.id}
      icon={myEditIcon}
      title={props.title}
      content={props.content}
      setHomeworkData={props.setHomeworkData}
    ></HomeworkModal>
  );
}
