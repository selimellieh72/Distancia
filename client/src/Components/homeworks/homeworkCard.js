import React, { useContext, useState, useEffect } from "react";

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
import HomeworkDrawer from "./HomeworkDrawer";
import UserAvatar from "../User/UserAvatar";

function HomeworkCard(props) {
  console.log(props.hasSeen);
  const isTeacher = useContext(authContext)[0].isTeacher;
  const [homeworkData, setHomeworkData] = useState({
    id: props.id,
    isAccomplished: props.isAccomplished,
    title: props.title,
    content: props.content,
    dueDate: props.dueDate,
    files: props.files,
    hasSeen: props.hasSeen,
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
      if (!props.hasSeen) {
        axios.patch(`/homeworks/${props.id}?seen=true`);
        setHomeworkData((prevHomeworkData) => ({
          ...prevHomeworkData,
          hasSeen: true,
        }));
      }
      onOpen();
    }
  }

  // useEffect(() => {
  //   props.setHomeworksData((prevHomeworkData) => ({
  //     ...prevHomeworkData,
  //     homeworks: [
  //       ...prevHomeworkData.homeworks.filter(
  //         (homework) => homework._id !== homeworkData.id
  //       ),
  //       homeworkData,
  //     ],
  //   }));
  // }, [homeworkData]);

  return (
    <div ref={btnRef} onClick={openHomework}>
      <HomeworkDrawer
        teacherProfile={props.teacherProfile}
        dueDate={props.dueDate}
        acceptAnswers={props.acceptAnswers}
        files={props.files}
        isExpired={props.isExpired}
        teacherName={props.teacherName}
        teacherDiscipline={props.teacherDiscipline}
        homeworkData={homeworkData}
        setHomeworkData={setHomeworkData}
        isOpen={isOpen}
        onClose={onClose}
        btnRef={btnRef}
        id={props.id}
      />
      <Flex
        bgColor={homeworkData.hasSeen && !isTeacher ? "#2b2b2b" : "#d3d3d3"}
        color={homeworkData.hasSeen && !isTeacher ? "#fff" : "#2b2b2b"}
        className="homework-card"
        borderRadius="20px"
        alignItems="center"
      >
        <Flex flex={1} flexDir="column" alignItems="center" textAlign="center">
          <UserAvatar m="0" external profile={props.teacherProfile} />
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
          <Wrap mr="16px">
            <EditHomework
              id={props.id}
              title={homeworkData.title}
              content={homeworkData.content}
              dueDate={homeworkData.dueDate}
              files={homeworkData.files}
              setHomeworkData={setHomeworkData}
              acceptAnswers={props.acceptAnswers}
            />

            <DeleteHomework
              id={props.id}
              setHomeworksData={props.setHomeworksData}
              size="50px"
            />
          </Wrap>
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
