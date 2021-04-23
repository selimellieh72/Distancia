import React, { useState, useContext } from "react";

import HomeworksList from "../../Components/homeworks/HomeworksList";
import { authContext } from "../../providers/AuthContext";
import { AddIcon } from "@chakra-ui/icons";
import {
  Menu,
  Portal,
  MenuList,
  MenuItem,
  MenuButton,
  Container,
  Flex,
  Button,
} from "@chakra-ui/react";
import PageHeader from "../../Components/Core/PageHeader.js";
import HomeworkModal from "../../Components/homeworks/HomeworkModal.js";

export default function Homework(props) {
  const [homeworksData, setHomeworksData] = useState({});
  const isTeacher = useContext(authContext)[0].isTeacher;
  const { gradeId, chapterId } = props.match.params || {};
  const [homeworksFilter, setHomeworksFilter] = useState('all');

  return (
    <div>
      <Container maxW="container.lg" p="18px">
        <PageHeader
          title={
            gradeId ? (
              <span className="page-title">
                {homeworksData.chapterTitle ||
                  homeworksData.gradeTitle ||
                  "Homeworks"}
              </span>
            ) : (
              "Homeworks"
            )
          }
          addButton={
            isTeacher &&
            gradeId &&
            chapterId && (
              <HomeworkModal
                gradeId={gradeId}
                chapterId={chapterId}
                setHomeworks={(setHomeworksCallback) => {
                  const homeworks = setHomeworksCallback(
                    homeworksData.homeworks
                  );
                  setHomeworksData({ ...homeworksData, homeworks });
                }}
                icon={AddIcon}
                button
              />
            )
          }
        />

        {!isTeacher && (
          <Flex mb="18px" justifyContent="end">
            <Menu>
              <MenuButton as={Button} colorScheme="blue">
                Filter
              </MenuButton>
              <Portal>
                <MenuList>
                <MenuItem onClick={() => setHomeworksFilter("all")}>
                    All
                  </MenuItem>
                  <MenuItem onClick={() => setHomeworksFilter("done")}>
                    Done
                  </MenuItem>
                  <MenuItem onClick={() => setHomeworksFilter("undone")}>
                    Undone
                  </MenuItem>
                  <MenuItem onClick={() => setHomeworksFilter("expired")}>
                    Expired
                  </MenuItem>
                  <MenuItem onClick={() => setHomeworksFilter("notExpired")}>
                    Not expired
                  </MenuItem>
                </MenuList>
              </Portal>
            </Menu>
          </Flex>
        )}
        <HomeworksList
          homeworksFilter={homeworksFilter}
          setHomeworksData={setHomeworksData}
          gradeId={gradeId}
          chapterId={chapterId}
          homeworks={homeworksData.homeworks}
        />
      </Container>
    </div>
  );
}
