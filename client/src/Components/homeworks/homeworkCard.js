import React, { useContext, useState } from "react";

import {
  Avatar,
  Flex,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { FaBook } from "react-icons/fa";
import DeleteHomework from "./DeleteHomework";
import { authContext } from "../../providers/AuthContext";
import HomeworkDetails from "./homeworkDetails";

import { FaCheckCircle } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import EditHomework from "./EditHomework";
import { getTime } from "date-fns";
import { ReactComponent as NotdoneSvg } from "../../assets/svg/remove.svg";
import axios from "axios";

function HomeworkCard(props) {
  const isTeacher = useContext(authContext)[0].isTeacher;
  const [homeworkData, setHomeworkData] = useState({
    isAccomplished: props.isAccomplished,
    title: props.title,
    content: props.content,
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const history = useHistory();

  function openHomework() {
    if (isTeacher) {
      history.push(`/homeworks/${props.id}`, {
        gradeId: props.gradeId,
        chapterId: props.chapterId,
      });
    } else {
      if (!props.hasSeen) axios.patch(`/homeworks/${props.id}?seen=true`);
      onOpen();
    }
  }

  return (
    <div ref={btnRef} onClick={openHomework}>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="md"
      >
        <DrawerOverlay>
          <DrawerContent overflowY="auto">
            <DrawerCloseButton color="#fff" />
            <HomeworkDetails
              id={props.id}
              title={homeworkData.title}
              content={homeworkData.content}
              teacherDiscipline={props.teacherDiscipline}
              teacherName={props.teacherName}
              files={props.files}
              acceptAnswers={props.acceptAnswers}
              onClose={onClose}
              setIsAcomplished={() =>
                setHomeworkData((prevData) => ({
                  ...prevData,
                  isAccomplished: true,
                }))
              }
              isAccomplished={homeworkData.isAccomplished}
              dueDate={props.dueDate}
              isExpired={props.isExpired}
            />
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
      <Flex
        bgColor="#d3d3d3"
        color="#2b2b2b"
        className="homework-card"
        borderRadius="20px"
        alignItems="center"
      >
        <Flex flex={1} flexDir="column" alignItems="center" textAlign="center">
          <Avatar />
          <p className="homework-card__teacher__name">{props.teacherName}</p>
        </Flex>

        <Flex flex={3} flexDir="column" ml="15px" alignItems="start">
          <h1 className="homework-card__title">{homeworkData.title}</h1>
          <Flex alignItems="center">
            <FaBook style={{ marginRight: "6px" }} />
            <p>{props.teacherDiscipline}</p>
          </Flex>
        </Flex>

        {isTeacher ? (
          <>
            <EditHomework
              id={props.id}
              title={props.title}
              content={props.content}
              setHomeworkData={setHomeworkData}
            />

            <DeleteHomework
              id={props.id}
              setHomeworks={props.setHomeworks}
              size="50px"
            />
          </>
        ) : (
          homeworkData.isAccomplished && (
            <FaCheckCircle size="25px" color="green" bgColor="white" />
          )
        )}
        {!isTeacher && props.isExpired && (
          <NotdoneSvg className="undone-homework" />
        )}
      </Flex>
    </div>
  );
}

export default HomeworkCard;
