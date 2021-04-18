import React, { useContext } from "react";
import Header from "../../Components/header/Header";
import {
  Container,
  Flex,
  Heading,
  Button,
  Box,
  Divider,
} from "@chakra-ui/react";
import BackIcon from "../../Components/Core/BackIcon";
import { ReactComponent as GridSvg } from "../../assets/svg/grid.svg";
import TestsList from "../../Components/Tests/TestsList";
import PageHeader from "../../Components/Core/PageHeader";
import { authContext } from "../../providers/AuthContext";

export default function Test() {
  const isTeacher = useContext(authContext)[0].isTeacher;

  return (
    <>
      <Container maxW="container.lg" p="18px">
        {isTeacher? <PageHeader title={"grade"} /> :<PageHeader title={"material"} /> }
        <TestsList />
      </Container>
    </>
  );
}
