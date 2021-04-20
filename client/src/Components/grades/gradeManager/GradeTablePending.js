import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Button,
  Collapse,
  Center,
  useDisclosure,
  ButtonGroup,
} from "@chakra-ui/react";
import AcceptStudentButton from "./AcceptStudentButton";
import RejectStudentButton from "./RejectStudentButton";

export default function GradeTablePending(props) {
  const { isOpen, onToggle } = useDisclosure();
  const [requests, setRequests] = useState([]);

  useEffect(
    () =>
      axios
        .get(`/requests?${props.gradeId ? `grade=${props.gradeId}` : ""}`)
        .then((res) => setRequests(res.data)),
    []
  );
  return (
    <>
      <Center mt="1.5rem">
        <h1 className="homework-table__pending__section" onClick={onToggle}>
          Pending request
        </h1>
      </Center>
      <Collapse in={isOpen}>
        <Table mt="20px" variant="striped" colorScheme="black">
          <Thead>
            <Tr>
              <Th>Student name</Th>

              {/*accepted-pending*/}
              <Th>Action</Th>
              {/*accept-Refuse*/}
              {/* <Th >Files <AttachmentIcon/></Th> */}
            </Tr>
          </Thead>
          <Tbody>
            {requests?.map((request) => (
              <Tr key={request._id}>
                <Td>{request.student.fullName}</Td>

                <Td>
                  <ButtonGroup>
                    {" "}
                    <RejectStudentButton
                      studentName={request.student.fullName}
                      requestId={request._id}
                      setRequests={setRequests}
                    />
                    <AcceptStudentButton
                      studentName={request.student.fullName}
                      requestId={request._id}
                      setRequests={setRequests}
                      setStudents={props.setStudents}
                    />
                  </ButtonGroup>
                </Td>
                {/* <Td><BsFileEarmarkArrowDown/></Td> */}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Collapse>
    </>
  );
}
