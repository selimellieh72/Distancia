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
import LectureList from "../../Components/Lecture/LectureList";
import { authContext } from "../../providers/AuthContext";
import LectureModal from "../../Components/Lecture/LectureModal";
import { AddIcon, ArrowBackIcon } from "@chakra-ui/icons";

export default function Lecture() {
  const isTeacher = useContext(authContext)[0].isTeacher;

  return (
    <>
      <Container maxW="container.lg" p="18px">
        <Flex alignItems="center" minW="300px" justifyContent="space-between">
          <Heading as="h1">
            {" "}
            <BackIcon pathName="/grades" />
            <span className="page-title">Chapitre 1: Denombrement</span>
          </Heading>
          <div className="page-header__icon">
            {isTeacher && <LectureModal icon={AddIcon} button />}
            <Button>
              <GridSvg className="page-header__icon__grid" />
            </Button>
          </div>
        </Flex>
        <Box my="18px">
          <Divider borderColor="black" opacity="0.2" variant="solid" />
        </Box>
        <LectureList />
      </Container>
    </>
  );
}
