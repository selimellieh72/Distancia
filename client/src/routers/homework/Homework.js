import React, { useState, useContext } from "react";

import HomeworksList from "../../Components/homeworks/HomeworksList";
import { authContext } from "../../providers/AuthContext";
import { AddIcon, ArrowBackIcon } from "@chakra-ui/icons";
import { Container, Flex, Heading, Divider, Box, Button } from "@chakra-ui/react";

import Header from "../../Components/header/Header";
import HomeworkModal from "../../Components/homeworks/HomeworkModal.js";
import BackIcon from "../../Components/Core/BackIcon";
import { ReactComponent as GridSvg } from "../../assets/svg/grid.svg";

export default function Homework(props) {
  const [homeworksData, setHomeworksData] = useState({});
  const isTeacher = useContext(authContext)[0].isTeacher;
  const gradeId = props.match.params.id;

  return (
    <div>
      <Header />
      <Container maxW="container.lg" p="18px">
        <Flex alignItems="center" minW="300px" justifyContent="space-between">
          <Heading className="page-header" as="h1">
            {" "}
            <BackIcon pathName="/grades" />
            {gradeId ? (
              <span className="page-title">
                {homeworksData.gradeTitle || ""}
              </span>
            ) : (
              "Homeworks"
            )}
          </Heading>
          <div className="page-header__icon" >
          {isTeacher && gradeId && (
            <HomeworkModal
              gradeId={gradeId}
              setHomeworks={(setHomeworksCallback) => {
                const homeworks = setHomeworksCallback(homeworksData.homeworks);
                setHomeworksData({ ...homeworksData, homeworks });
              }}
              icon={AddIcon}
              button
            />
          )}
          <Button>
          <GridSvg className="page-header__icon__grid"/>
          </Button>
          </div>
        </Flex>
        <Box my="18px">
        <Divider borderColor="black" opacity="0.2" variant="solid" />
        </Box>

        <HomeworksList
          setHomeworksData={setHomeworksData}
          gradeId={gradeId}
          homeworks={homeworksData.homeworks}
        />
      </Container>
    </div>
  );
}
