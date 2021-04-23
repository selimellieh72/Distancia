import React, { useState } from "react";
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
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";

export default function DeleteGradeModal(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [inputGradeTitle, setInputGradeTitle] = useState();
  const toast = useToast();
  const cancelRef = React.useRef();

  const onSubmit = () => {
    axios.delete(`/grades/${props.gradeId}`).then(() => {
      props.setGrades((grades) =>
        grades.filter((g) => g._id !== props.gradeId)
      );
      onClose();
      toast({
        duration: 4000,
        status: "success",
        isClosable: true,
        title: "Grade deleted",
        description: `Successfuly deleted grade of title '${props.title}'`,
      });
    });
  };

  return (
    <>
      <Tooltip label="Delete Grade" aria-label="A tooltip" bg="red.600">
        <Button
          width="125px"
          onClick={(e) => {
            e.stopPropagation();
            onOpen();
          }}
          colorScheme="red"
        >
          Delete
        </Button>
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
          <AlertDialogHeader>Delete Grade?!</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are you sure you want to completely delete your Grade '{props.title}
            '? This will wipe out all it's data and the students answers and
            cannot be retrieved back.
            <FormControl mt="6">
              <FormLabel>
                <strong>Please enter '{props.title}' to proceed:</strong>
              </FormLabel>
              <Input
                onChange={({ target }) => setInputGradeTitle(target.value)}
                placeholder={props.title}
              />
            </FormControl>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button
              disabled={inputGradeTitle !== props.title}
              colorScheme="red"
              ml={3}
              onClick={onSubmit}
            >
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
