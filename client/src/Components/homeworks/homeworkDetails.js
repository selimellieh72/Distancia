import React from "react";
import { Avatar, Flex, Tooltip, Badge, Wrap, WrapItem } from "@chakra-ui/react";
import moment from "moment";
import HomeworkAccomplish from "./HomeworkAccomplish";
import AnswerHomework from "./AnswerHomework";

export default function HomeworkDetails(props) {
  return (
    <div className="homework-details__drawer">
      <div className="sender-details">
        <Avatar size="lg" mb="1rem" mt="2rem" />
        <p className="sender-details__name">{props.teacherName}</p>
        <p className="sender-details__discipline">{props.teacherDiscipline}</p>
      </div>
      <div className="homework-details">
        <h1 className="homework-details__title">{props.title}</h1>

        {props.fileIds && (
          <Wrap mt="4rem">
            {props.fileIds.map((id) => (
              <WrapItem key={id}>
                <a href={`http://localhost:5000/uploads/${id}`} download>
                  Download file
                </a>
              </WrapItem>
            ))}
          </Wrap>
        )}
        <Wrap mb="2rem">
          {props.isAccomplished && (
            <WrapItem>
              <Badge variant="solid" colorScheme="green">
                Acomplished
              </Badge>
            </WrapItem>
          )}
          {props.fileIds && (
            <WrapItem>
              <Badge colorScheme="purple">File attached</Badge>
            </WrapItem>
          )}
          {props.acceptAnswers && (
            <WrapItem>
              <Badge colorScheme="yellow">Accept answers</Badge>
            </WrapItem>
          )}
        </Wrap>

        <p className="homework-details__content__title">Content:</p>
        <div className="homework-details__content">
          <p className="homework-details__content__text">{props.content}</p>
        </div>
        <div className="homework-details__duedate">
          <p className="homework-details__duedate__title">Due Date</p>
          <div className="homework-details__duedate__timing">
            <span style={{ whiteSpace: "pre" }}>
              {moment(props.dueDate).format("MMM. D, YYYY[\n]h:mm A z")}
            </span>
          </div>
        </div>
      </div>

      <Flex justifyContent="center">
        {props.isAccomplished ? (
          <> </>
        ) : (
          <Tooltip label={"Click to mark this homework as accomplished"}>
            <span>
              {props.acceptAnswers ? (
                <AnswerHomework
                  id={props.id}
                  setIsAcomplished={props.setIsAcomplished}
                />
              ) : (
                <HomeworkAccomplish
                  id={props.id}
                  setIsAcomplished={props.setIsAcomplished}
                  isAccomplished={props.isAccomplished}
                  onClose={props.onClose}
                  disabled={props.acceptAnswers}
                />
              )}
            </span>
          </Tooltip>
        )}
      </Flex>
    </div>
  );
}
