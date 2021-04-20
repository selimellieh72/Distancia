import React from "react";
import axios from "axios";
import {
  Button,
  useDisclosure,
  Modal,
  ModalBody,
  ModalOverlay,
  ModalFooter,
  ModalHeader,
  ModalContent,
  ModalCloseButton,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
export default function RemoveStudentButton(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const deleteStudent = () =>
    axios
      .patch(`/grades/${props.gradeId}?removeStudent=${props.studentId}`)
      .then((res) => {
        props.setStudents((prevStudents) =>
          prevStudents.filter((student) => student._id !== props.studentId)
        );
        onClose();
      });

  return (
    <>
      <Button onClick={onOpen} size="sm" colorScheme="red">
        Remove <DeleteIcon ml="5px" />
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Remove student?!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure do you want to remove the student '{props.studentName}'
            from your grade '{props.gradeTitle}'?
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Close
            </Button>
            <Button onClick={deleteStudent} colorScheme="red">
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
