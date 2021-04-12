import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";
import { AttachmentIcon } from "@chakra-ui/icons";
import { BsFileEarmarkArrowDown } from "react-icons/bs";

export default function Homeworktable(props) {
  return (
    <Table mt="40px" variant="striped" colorScheme="black">
      <Thead>
        <Tr>
          <Th>Student name</Th>
          <Th>Status</Th>
          <Th>
            Files <AttachmentIcon />
          </Th>
          <Th>Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {props.answers.map((answer) => (
          <Tr>
            <Td>{answer.student.fullName}</Td>
            <Td>Seen</Td>
            <Td>
              <BsFileEarmarkArrowDown size="25px" />
            </Td>
            <Td>
              <a href={`http://localhost:5000/uploads/${answer.fileId}`}>
                Download
              </a>{" "}
              | <a>Correct</a> | <a>Send</a>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
