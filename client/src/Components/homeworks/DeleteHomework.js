import React from "react";
import axios from "axios";
import {
  Tooltip,
  useToast,
  Button,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
} from "@chakra-ui/react";

import { FaTrash } from "react-icons/fa";

export default function DeleteHomework(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const cancelRef = React.useRef();

  function deleteHomework() {
    axios.delete(`http://localhost:5000/homeworks/${props.id}`).then((_) => {
      props.setHomeworks((prevHomeworks) =>
        prevHomeworks.filter((hom) => hom._id !== props.id)
      );
      onClose();
      toast({
        title: "Homework deleted",
        status: "info",
        description: "We have successfully deleted your homework!",
        isClosable: true,
      });
    });
  }

  return (
    <>
      <Tooltip label="Delete Homework" aria-label="A tooltip" bg="red.600">
        <span>
          <FaTrash
            onClick={(e) => {
              e.stopPropagation();
              onOpen();
            }}
            className="trash-icon"
          />
        </span>
      </Tooltip>

      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent m="16px">
          <AlertDialogHeader>Delete Homework?!</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are you sure you want to completely delete the homework? This will
            wipe out all it's data and the students answers and cannot be
            retrieved back.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button onClick={deleteHomework} colorScheme="red" ml={3}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
