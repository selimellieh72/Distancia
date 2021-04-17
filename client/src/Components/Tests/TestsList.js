import React, { useContext } from "react";
import { authContext } from "../../providers/AuthContext";
import { ReactComponent as NoTestsSvg } from "../../assets/svg/exam.svg";
import TestCard from "./TestCard";
import { Button } from "@chakra-ui/button";
import { Center } from "@chakra-ui/layout";
import { Link } from "react-router-dom";

export default function TestsList() {
  const isTeacher = useContext(authContext)[0].isTeacher;
  return (
    <>
      <div className="tests-list">
        <TestCard isTeacher={isTeacher} />
        <Center mt="1.5rem">
          {isTeacher?<Link to="/testcreator"> <Button colorScheme="green">Create a test</Button> </Link>:null}
        </Center>
      </div>
      {/* <div className="list-empty">
        <NoTestsSvg />

        {isTeacher ? (
          <p className="list-empty__text">
            No Tests Found <br />
            Add Your First Test
          </p>
        ) : (
          <p className="list-empty__text">
            No Tests <br /> Found
          </p>
        )}
      </div> */}
    </>
  );
}
