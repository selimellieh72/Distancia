import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ListItem, ListIcon, Collapse, UnorderedList } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { ReactComponent as MoreSvg } from "../../assets/svg/more.svg";
import { FaTrash } from "react-icons/fa";
import { authContext } from "../../providers/AuthContext";

export default function ChapterCollapsible({ title, gradeId, chapterId }) {
  const [isToogled, setIsToogled] = useState();
  const isTeacher = React.useContext(authContext)[0].isTeacher;

  return (
    <>
      <div onClick={() => setIsToogled(!isToogled)}>
        <ListItem className="chapter-button">
          <div className="chapter-button__text">
            <ListIcon
              transition="0.4s"
              transform={isToogled && "rotate(90deg)"}
              as={ChevronRightIcon}
            />

            <span>{title}</span>
          </div>

          {isTeacher && <FaTrash className="delete-icon" />}
        </ListItem>
      </div>

      <Collapse in={isToogled} animateOpacity className="grade-content">
        <UnorderedList mb="1rem" minWidth="min-content" spacing={1.5}>
          <ListItem className="grade-content__type">
            <Link to={`/grades/${gradeId}/chapter/${chapterId}/lectures`}>
              Lecture
            </Link>
          </ListItem>
          <ListItem className="grade-content__type">
            <Link to={"/meetings"}>Meetings</Link>
          </ListItem>
          <ListItem className="grade-content__type">
            <Link to={`/grades/${gradeId}/chapter/${chapterId}/homeworks`}>
              Homeworks
            </Link>
          </ListItem>
          <ListItem className="grade-content__type">
            <Link to={"/tests"}>Tests</Link>
          </ListItem>
        </UnorderedList>
      </Collapse>

      <hr className="chapter-divider" />
    </>
  );
}
