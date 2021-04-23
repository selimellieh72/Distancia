import React from "react";
import { Link } from "react-router-dom";
import { Button, List, Wrap, Center } from "@chakra-ui/react";

import GradeId from "./gradesItem/GradeId";
import AddChapterModal from "./AddChapterModal";
import DeleteGradeModal from "./DeleteGradeModal";
import { ReactComponent as MessageIcon } from "../../assets/svg/send.svg";
import ChapterCollapsible from "./ChapterCollapsible";

export default function GradeDetails(props) {
  const isTeacher = props.isTeacher;

  return (
    <>
      <div className="grade-details">
        <p className="grade-details__name">
          {isTeacher ? props.title : "Material"}
        </p>
        <p className="grade-details__discipline">{props.material}</p>
      </div>
      {/* Message */}
      <Link to={`/grades/${props.id}/messages`}>
        <div className="grade-details__message__part">
          <div className="grade-details__message">
            <p>Messages</p>
            <MessageIcon className="grade-details__message__icon" />
          </div>
        </div>
      </Link>
      {/* grade ID */}
      {isTeacher && <GradeId id={props.id} />}
      {/* chapter */}
      {props.gradeDetails.chapters.length !== 0 ? (
        <List spacing={3} mb="3rem" mt="3rem">
          {props.gradeDetails.chapters?.map((chapter) => (
            <ChapterCollapsible
              key={chapter._id}
              title={chapter.title}
              chapterId={chapter._id}
              gradeId={props.id}
              gradeTitle={props.title}
              setGradeDetails={props.setGradeDetails}
            />
          ))}
        </List>
      ) : (
        <p className="no-chapter__message">
          No chapters <br />
          added
        </p>
      )}

      {/* manage */}

      <div className="grade-manage">
        {isTeacher && (
          <Wrap justify="center">
            <AddChapterModal
              gradeId={props.id}
              addChapter={(chapter) =>
                props.setGradeDetails({
                  ...props.gradeDetails,
                  chapters: [...props.gradeDetails.chapters, chapter],
                })
              }
            />
            <Link
              to={{
                pathname: `/grades/${props.id}`,
              }}
            >
              <Button width="125px" colorScheme="green">
                Manage
              </Button>
            </Link>
          </Wrap>
        )}

        <Wrap justify="center">
          {isTeacher && (
            <DeleteGradeModal
              setGrades={props.setGrades}
              title={props.title}
              gradeId={props.id}
            />
          )}
        </Wrap>

        <div className="grade-manager__delete"></div>
      </div>
    </>
  );
}
