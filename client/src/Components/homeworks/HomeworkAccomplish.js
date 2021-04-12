import React from "react";

import {
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import AccomplishButton from "./AccomplishButton";

function HomeworkAccomplish(props) {
  const toast = useToast();

  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();

  function acomplishHomework() {
    axios
      .patch(`http://localhost:5000/homeworks/${props.id}?accomplish=1`)
      .then(() => {
        props.setIsAcomplished(true);
        onClose();
        props.onClose();
        toast({
          status: "success",
          title: "Successfully accomplished",
          description:
            "Your homework has been successfully accomplished, and is now visible for your teacher",
          duration: 3000,
          isClosable: true,
        });
      });
  }

  return (
    <div>
      {!props.isAccomplished && (
        <AccomplishButton onClick={() => setIsOpen(true)} />
      )}
      <AlertDialog
        isCentered={true}
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Mark Homework as Accomplished
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="green" onClick={acomplishHomework} ml={3}>
                Mark as Accomplished
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </div>
  );
}

export default HomeworkAccomplish;
