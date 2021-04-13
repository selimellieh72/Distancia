import React, { useState } from "react";
import axios from "axios";
import GradeManager from "../../../routers/grades/GradeManager";
import { Table, Thead, Tbody, Tr, Th, Td, Button } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

export default function GradeTable(props) {
  const [students, setStudents] = useState(props.students);
  const deleteStudent = (studentId) =>
    axios
      .patch(`/grade/${props.gradeId}?removeStudent=${studentId}`)
      .then((res) =>
        setStudents((prevStudents) =>
          prevStudents.filter((student) => student._id !== studentId)
        )
      );
  return (
    <>
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
          {students.map((student) => (
            <Tr key={student._id}>
              <Td>{student.fullName}</Td>
              <Td>Accept</Td>
              <Td>
                <Button
                  onClick={() => deleteStudent(student._id)}
                  size="sm"
                  colorScheme="red"
                >
                  Remove <DeleteIcon ml="5px" />
                </Button>
              </Td>
              {/* <Td><BsFileEarmarkArrowDown/></Td> */}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
}
