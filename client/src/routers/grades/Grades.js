import React, { useContext, useState } from "react";
import Header from "../../Components/header/Header";
import { Container, Flex, Heading, Divider, Box } from "@chakra-ui/react";

import { authContext } from "../../providers/AuthContext";
import AddGradesModal from "../../Components/grades/AddGradesModal";
import GradesList from "../../Components/grades/GradesList";
import JoinGrades from "../../Components/grades/JoinGrades";

function Grades() {
  const isTeacher = useContext(authContext)[0].isTeacher;
  const [grades, setGrades] = useState(null);
  return (
    <div>
      <Container maxW="container.lg" p="18px">
        <Flex alignItems="center" minW="300px" justifyContent="space-between">
          {isTeacher ? (
            <Heading as="h1">Grades</Heading>
          ) : (
            <Heading as="h1">Material</Heading>
          )}
          {isTeacher ? (
            <AddGradesModal setGrades={setGrades} />
          ) : (
            <JoinGrades setGrades={setGrades} />
          )}
        </Flex>
        <Box my="18px">
          <Divider borderColor="black" opacity="0.2" variant="solid" />
        </Box>
        <GradesList grades={grades} setGrades={setGrades} />
      </Container>
    </div>
  );
}

export default Grades;