import {
  Collapse,
  Container,
  useDisclosure,
  List,
  ListItem,
  Heading,
} from "@chakra-ui/react";
import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import moment from "moment";
export default function HomeworkTableCard(props) {
  const { isOpen, onToggle } = useDisclosure();
  const baseURL =
    window.location.origin === "http://localhost:3000"
      ? "http://localhost:5000/api"
      : window.location.origin + "/api";

  return (
    <div className="homework-table-card">
      <h1 onClick={onToggle}>{props.studentName}</h1>

      <Collapse in={isOpen}>
        <Container padding="1rem">
          <div className="homework-table-card__status">
            <h1 className="homework-table-card__status__title">Status:</h1>
            {props.hasAccomplished ? (
              <>
                <p className="homework-table-card__status__tag">Done</p>
                <FaCheckCircle size="25px" color="green" bgColor="white" />
              </>
            ) : (
              <p>Pending</p>
            )}
          </div>
          <div className="homework-table-card__status">
            <h1 className="homework-table-card__status__title">Seen:</h1>
            {props.hasAccomplished ? (
              <>
                <p className="homework-table-card__status__tag">Done</p>
                <FaCheckCircle size="25px" color="green" bgColor="white" />
              </>
            ) : (
              <p>
                {props.lastSeen
                  ? moment(props.lastSeen).format("MMM. D, YYYY h:mm A z")
                  : "Not yet."}
              </p>
            )}
          </div>
          <div className="homework-table-card__actions">
            <List
              mt="1.5rem"
              justifyContent="Center"
              display="flex"
              flexDir="row"
            >
              {props.answerFileId && (
                <ListItem key={props.answerFileId}>
                  <a href={`${baseURL}/uploads/${props.answerFileId}`} download>
                    <strong>Download</strong>
                  </a>
                </ListItem>
              )}

              {/* <p>|</p>
                 <ListItem><strong>Send</strong></ListItem> */}
            </List>
          </div>
        </Container>
      </Collapse>
      <hr />
    </div>
  );
}
