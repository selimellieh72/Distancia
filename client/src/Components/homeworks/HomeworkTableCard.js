import { Collapse, Container, useDisclosure, List, ListItem } from "@chakra-ui/react";
import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { ReactComponent as NotdoneSvg } from "../../assets/svg/remove.svg";



export default function HomeworkTableCard() {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <div onClick={onToggle} className="homework-table-card">
      <h1>Student Student</h1>

      <Collapse in={isOpen}>
        <Container padding="1rem">
          <div className="homework-table-card__status">
            <h1 className="homework-table-card__status__title">Status:</h1>
            <p className="homework-table-card__status__tag">Done</p>{" "}
            <FaCheckCircle size="25px" color="green" bgColor="white" />
          </div>
          <div className="homework-table-card__actions">
            <List mt="1.5rem" justifyContent="Center" display="flex" flexDir="row">
                <ListItem><strong>Download</strong></ListItem>
                <p>|</p>
                 <ListItem><strong>Send</strong></ListItem>
            </List>
        </div>
        </Container>
      </Collapse>
      <hr />
    </div>
  );
}
