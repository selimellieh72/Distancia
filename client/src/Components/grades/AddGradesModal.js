import React, { useRef, useContext } from "react";
import { authContext } from "../../providers/AuthContext";
import axios from "axios";
import { useForm } from "react-hook-form";
import {
  useToast,
  FormControl,
  FormLabel,
  Input,
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
  ButtonGroup,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

export default function AddGradesModal(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit } = useForm();
  const toast = useToast();
  const { isTeacher, discipline } = useContext(authContext)[0];

  const initialRef = useRef();

  const addedGradeRef = useRef();

  function onSubmit(data) {
    axios.post("http://localhost:5000/grades", data).then((res) => {
      props.setGrades((prevGrades) => [
        { ...res.data, ref: addedGradeRef },
        ...prevGrades,
      ]);
      onClose();
      toast({
        status: "success",
        title: "Grade successfully added",
        description: `Your grade with the title '${res.data.title}' was successfully added`,
        isClosable: true,
      });
      addedGradeRef.current.click();
    });
  }

  return (
    <>
      <IconButton icon={<AddIcon />} onClick={onOpen} />

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Grade</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <form id="join-grade" onSubmit={handleSubmit(onSubmit)}>
                <FormLabel>Grade name: </FormLabel>
                <Input
                  name="title"
                  ref={register({ required: "Please enter a grade id" })}
                ></Input>
                {isTeacher && (
                  <p className="modal-grade__discipline">{discipline}</p>
                )}
              </form>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <ButtonGroup>
              <Button type="submit" form="join-grade" colorScheme="blue">
                Add grade
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
