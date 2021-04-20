import React from "react";
import axios from "axios";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
export default function RejectStudentButton(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onSubmit = () => {
    axios
      .delete(`/requests/${props.requestId}`)
      .then((res) => console.log(res));
    props.setRequests((prevRequests) =>
      prevRequests.filter((request) => request._id !== props.requestId)
    );
  };
  return (
    <>
      <Button onClick={onOpen} width="70px" size="sm" colorScheme="red">
        Reject
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Reject student</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to reject student '{props.studentName}' to
            join your grade?
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button onClick={onSubmit} colorScheme="red">
              Reject
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
