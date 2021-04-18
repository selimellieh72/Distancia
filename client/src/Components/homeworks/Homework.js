import React, { useState, useContext } from "react";

import HomeworksList from "../../Components/homeworks/HomeworksList";
import { authContext } from "../../providers/AuthContext";
import { AddIcon, ArrowBackIcon } from "@chakra-ui/icons";
import {
  Container,
  Flex,
  Heading,
  Divider,
  Box,
  Button,
} from "@chakra-ui/react";

import Header from "../../Components/header/Header";
import HomeworkModal from "../../Components/homeworks/HomeworkModal.js";
import BackIcon from "../../Components/Core/BackIcon";
import { ReactComponent as GridSvg } from "../../assets/svg/grid.svg";

export default function Homework(props) {
  const [homeworksData, setHomeworksData] = useState({});
  const isTeacher = useContext(authContext)[0].isTeacher;
  const gradeId = props.match.params.id;

  return <div></div>;
}
