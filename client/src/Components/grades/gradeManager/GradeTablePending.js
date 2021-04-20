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
  Center,
  useDisclosure,
} from "@chakra-ui/react";

export default function GradeTablePending(props) {
  const {isOpen , onToggle} = useDisclosure();
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
              <Th>Status</Th>
              {/*accepted-pending*/}
              <Th>Action</Th>
              {/*accept-Refuse*/}
              {/* <Th >Files <AttachmentIcon/></Th> */}
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>student student</Td>
              <Td>Waiting...</Td>
              <Td>
                <Button mr="1rem" width="70px" size="sm" colorScheme="red">
                  Deny
                </Button>
                <Button width="70px" size="sm" colorScheme="green">
                  Accept
                </Button>
              </Td>
              {/* <Td><BsFileEarmarkArrowDown/></Td> */}
            </Tr>
          </Tbody>
        </Table>
      </Collapse>
    </>
  );
}
