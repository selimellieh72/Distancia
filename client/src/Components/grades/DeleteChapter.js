import { Tooltip } from "@chakra-ui/tooltip";
import React from "react";
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
  useToast,
} from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";
import axios from "axios";

export default function DeleteChapter(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();

  const openDelete = (event) => {
    event.stopPropagation();

    onOpen();
  };

  const deleteChapter = () => {
    axios
      .patch(`/grades/${props.gradeId}?deleteChapter=true`, {
        chapterId: props.chapterId,
      })
      .then((res) => {
        props.setGradeDetails((prevGradeDetails) => ({
          ...prevGradeDetails,
          chapters: prevGradeDetails.chapters.filter(
            (chapter) => chapter._id !== props.chapterId
          ),
        }));

        onClose();
        toast({
          title: "Chapter deleted!",
          description: `Successfully deleted chapter '${props.title}' from grade '${props.gradeTitle}'.`,
          duration: 3000,
          status: "info",
        });
      });
  };

  return (
    <>
      <Tooltip label="Delete chapter" bg="red">
        <span>
          <FaTrash className="delete-icon" onClick={openDelete} />
        </span>
      </Tooltip>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Chapter?!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to delete chapter '{props.title}' from your
            grade '{props.gradeTitle}'? This action is irreversable.
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Close
            </Button>
            <Button onClick={deleteChapter} colorScheme="red">
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
