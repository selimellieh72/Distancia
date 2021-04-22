import React from "react";
import { Link } from "react-router-dom";
import { Button, List, Wrap } from "@chakra-ui/react";

import GradeId from "./gradesItem/GradeId";
import { getByDisplayValue } from "@testing-library/dom";
import AddChapterModal from "./AddChapterModal";
import DeleteGradeModal from "./DeleteGradeModal";

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
              gradeTitle={props.title}
              gradeId={props.id}
            />
          )}
          <Link to={`/grades/${props.id}/messages`}>
            <Button width="125px" colorScheme="messenger">
              Messages
            </Button>
          </Link>
        </Wrap>

        <div className="grade-manager__delete"></div>
      </div>
    </>
  );
}
