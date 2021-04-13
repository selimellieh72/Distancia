import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
  Collapse,
  useDisclosure,
  Center,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import GradeId from "./gradesItem/GradeId";
import { getByDisplayValue } from "@testing-library/dom";
import AddChapterModal from "./AddChapterModal";
import DeleteGradeModal from "./DeleteGradeModal";
import { ReactComponent as MoreSvg } from "../../assets/svg/more.svg";

export default function GradeDetails(props) {
  const isTeacher = props.isTeacher;
  const { isOpen, onToggle } = useDisclosure();

  return (
    <>
      <div className="grade-details">
        <p className="grade-details__name">
          {isTeacher ? props.title : "Material"}
        </p>
        <p className="grade-details__discipline">{props.material}</p>
      </div>
      {/* grade ID */}
      {isTeacher ? <GradeId id={props.id} /> : null}
      {/* chapter */}
      <List spacing={3} mb="3rem" mt="3rem">
        <div onClick={onToggle}>
          <ListItem className="chapter-button">
            <div className="chapter-button__text">
              <ListIcon
                transition="0.4s"
                transform={isOpen && "rotate(90deg)"}
                as={ChevronRightIcon}
              />

              <span>Chapitre 1: Denombrement</span>
            </div>
            <Link to="/chapterAccomplishment">
              <MoreSvg className="more-icon" />
            </Link>
          </ListItem>
        </div>

        <Collapse in={isOpen} animateOpacity className="grade-content">
          <UnorderedList mb="1rem" minWidth="min-content" spacing={1.5}>
            <ListItem className="grade-content__type">
              <Link to={"/lecture"}>Lecture</Link>
            </ListItem>
            <ListItem className="grade-content__type">
              <Link to={"/meetings"}>Meetings</Link>
            </ListItem>
            <ListItem className="grade-content__type">
              <Link to={`/homeworks/${props.id}`}>Homeworks</Link>
            </ListItem>
            <ListItem className="grade-content__type">
              <Link to={"/tests"}>Tests</Link>
            </ListItem>
            <ListItem className="grade-content__type">
              <Link to={"/messages"}>Messages
              </Link>
            </ListItem>
          </UnorderedList>
        </Collapse>

        <hr className="chapter-divider" />
      </List>
      {/* manage */}
      {isTeacher && (
        <div className="grade-manage">
          <Center>
            <AddChapterModal />

            <Link
              to={{
                pathname: "/manager",
                state: { students: props.students, gradeId: props.id },
              }}
            >
              <Button width="125px" colorScheme="green">
                Manage
              </Button>
            </Link>
          </Center>
          <div className="grade-manager__delete">
            <DeleteGradeModal />
          </div>
        </div>
      )}
    </>
  );
}
