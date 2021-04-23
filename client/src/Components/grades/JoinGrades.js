import React, { useRef } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
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
  IconButton,
  Input,
  FormLabel,
  FormControl,
  FormHelperText,
  ButtonGroup,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

export default function JoinGrades(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, errors, setError, handleSubmit } = useForm();

  const toast = useToast();
  const initialRef = useRef();

  function onSubmit(data) {
    axios
      .post(`/join-grade/${data.gradeId}?`)
      .then((res) => {
        onClose();
        toast({
          title: "Grade join request sent!",
          status: "info",
          description: `Your request to join the grade '${res.data.title}' has been sent to teacher '${res.data.teacher.fullName}'`,
          duration: 6000,
          isClosable: true,
        });
      })
      .catch((e) => {
        setError("gradeId", {
          type: "server",
          message:
            e.response?.data.message || "Please enter a correct grade id.",
        });
      });
  }

  return (
    <>
      <IconButton icon={<AddIcon />} onClick={onOpen} />

      <Modal
        isCentered
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Join Grade</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isInvalid={errors.gradeId} isRequired>
              <FormLabel>Grade Id:</FormLabel>
              <Input name="gradeId" ref={register}></Input>
              <FormHelperText>
                The grade id should be given by your teacher.
              </FormHelperText>
              <FormErrorMessage>
                {errors.gradeId && errors.gradeId.message}
              </FormErrorMessage>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <ButtonGroup>
              <Button colorScheme="blue" onClick={handleSubmit(onSubmit)}>
                Join
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
