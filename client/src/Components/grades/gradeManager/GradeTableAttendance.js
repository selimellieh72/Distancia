import React from "react";
import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Button,
  Collapse,
  useDisclosure,
  Center,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

export default function GradeTableAttendance(props) {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <>
      <Center mt="4rem">
        <h1 className="homework-table__pending__section" onClick={onToggle}>
          Students
        </h1>
      </Center>
      <Collapse in={isOpen}>
        <Table mt="20px" variant="striped" colorScheme="black">
          <Thead>
            <Tr>
              <Th>Student name</Th>
              <Th>Status</Th>
              {/*accepted-pending*/}
              <Th>Action</Th>
              {/*accept-Refuse*/}
              {/* <Th >Files <AttachmentIcon/></Th> */}
            </Tr>
          </Thead>
          <Tbody>
            {props.students?.map((student) => (
              <Tr key={student._id}>
                <Td>{student.fullName}</Td>
                <Td>Accept</Td>
                <Td>
                  <Button
                    onClick={() => props.deleteStudent(student._id)}
                    size="sm"
                    colorScheme="red"
                  >
                    Remove <DeleteIcon ml="5px" />
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Collapse>
    </>
  );
}
