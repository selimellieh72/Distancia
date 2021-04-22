import React, { useEffect } from "react";
import axios from "axios";
import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Collapse,
  useDisclosure,
  Center,
  Icon,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import RemoveStudentButton from "./RemoveStudentButton";

export default function GradeTableAttendance(props) {
  useEffect(
    () =>
      axios
        .get(`/grades/${props.gradeId}?students=true&title=true`)
        .then((res) => {
          props.setGradeTitle(res.data.title);
          props.setStudents(res.data.students);
        }),
    []
  );
  const [isToogled, setIsToogled] = React.useState();
  const { isOpen, onToggle } = useDisclosure();
  return (
    <>
      <Center mt="4rem">
        <div className="homework-table__sections">
          <Icon
            className="chevron-icon"
            as={ChevronRightIcon}
            w={10}
            h={10}
            transition="0.4s"
            transform={isToogled && "rotate(90deg)"}
          />
          <h1
            className="homework-table__pending__section"
            onClick={() => {
              setIsToogled(!isToogled);
              onToggle();
            }}
          >
            Students
          </h1>
        </div>
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
            {props.students?.map((student) => (
              <Tr key={student._id}>
                <Td>{student.fullName}</Td>

                <Td>
                  <RemoveStudentButton
                    gradeTitle={props.gradeTitle}
                    gradeId={props.gradeId}
                    studentId={student._id}
                    setStudents={props.setStudents}
                    studentName={student.fullName}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Collapse>
    </>
  );
}
