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
import { set } from "js-cookie";
import { FaCheckCircle } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import EditHomework from "./EditHomework";
import { getTime } from "date-fns";
import { ReactComponent as NotdoneSvg } from "../../assets/svg/remove.svg";


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
    // if (homeworkData.isAccomplished === true) {
    //   return onOpen;
    // } else {
    //   var today = new Date();
    //   var date =
    //     today.getFullYear() +
    //     "-" +
    //     (today.getMonth() + 1) +
    //     "-" +
    //     today.getDate();
    //   var time =
    //     today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    //   var openedAt = date + " " + time;
    //   console.log(openedAt);
    // }
    onOpen();
  }

  return (
    <div
      ref={btnRef}
      onClick={
        isTeacher
          ? () =>
              history.push("/homeworktable", {
                gradeId: props.gradeId,
                homeworkTitle: homeworkData.title,
                answers: props.answers,
              })
          : openHomework
      }
    >
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
              fileIds={props.fileIds}
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
          <p style={{ fontWeight: "bold" }}>{props.teacherName}</p>
        </Flex>

        <Flex flex={3} flexDir="column" ml="15px" alignItems="start">
          <h1>{homeworkData.title}</h1>
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
        {!isTeacher && <NotdoneSvg className="undone-homework" />}
      </Flex>
    </div>
  );
}

export default HomeworkCard;
