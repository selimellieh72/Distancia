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
      .post(`http://localhost:5000/join-grade/${data.gradeId}?`)
      .then((res) => {
        props.setGrades((prevGrades) => [res.data, ...prevGrades]);
        onClose();
        toast({
          title: "Grade joined!",
          status: "success",
          description: `Successfully joined grade '${res.data.title}' of teacher '${res.data.teacherName}'`,
          duration: 6000,
          isClosable: true,
        });
      })
      .catch((e) => {
        setError("gradeId", {
          type: "server",
          message: "Incorrect id, please try again.",
        });
      });
  }

  return (
    <>
      <IconButton icon={<AddIcon />} onClick={onOpen} />

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
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
