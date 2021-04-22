import React from "react";
import {
  Avatar,
  Flex,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Wrap,
} from "@chakra-ui/react";
import HomeworkDetails from "./homeworkDetails";

export default function HomeworkDrawer(props) {
  return (
    <Drawer
      isOpen={props.isOpen}
      placement="right"
      onClose={props.onClose}
      finalFocusRef={props.btnRef}
      size="md"
    >
      <DrawerOverlay>
        <DrawerContent overflowY="auto">
          <DrawerCloseButton color="#fff" />
          <HomeworkDetails
            id={props.id}
            title={props.homeworkData.title}
            content={props.homeworkData.content}
            teacherDiscipline={props.teacherDiscipline}
            teacherName={props.teacherName}
            files={props.files}
            acceptAnswers={props.acceptAnswers}
            onClose={props.onClose}
            setIsAcomplished={() =>
              props.setHomeworkData((prevData) => ({
                ...prevData,
                isAccomplished: true,
              }))
            }
            isAccomplished={props.homeworkData.isAccomplished}
            dueDate={props.dueDate}
            isExpired={props.isExpired}
          />
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
}
