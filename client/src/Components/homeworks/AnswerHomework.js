import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast,
} from "@chakra-ui/react";
import UploadFiles from "../Core/UploadFiles";
import AccomplishButton from "./AccomplishButton";
export default function AnswerHomework(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [fileId, setFileId] = useState(null);
  const getFileIds = (fileIds) => setFileId(fileIds[0]);
  const toast = useToast();

  const onSubmit = () => {
    axios
      .patch(`http://localhost:5000/homeworks/${props.id}?answer=1`, {
        fileId,
      })
      .then((res) => {
        props.setIsAcomplished(true);
        toast({
          status: "success",
          title: "Successfully answered",
          description:
            "Your answer has been successfully submitted and is now visible by your teacher",
          duration: 3000,
          isClosable: true,
        });
        onClose();
      });
  };

  return (
    <>
      <AccomplishButton onClick={onOpen} />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Answer homework</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <UploadFiles getFileIds={getFileIds} />
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                setFileId(null);
                onClose();
              }}
            >
              Close
            </Button>
            <Button onClick={onSubmit} variant="ghost" disabled={!fileId}>
              Answer
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
