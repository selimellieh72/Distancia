import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  FormControl,
  FormLabel,
  Button,
  Select,
  Switch,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Collapse,
  useToast,
} from "@chakra-ui/react";
import { authContext } from "../../providers/AuthContext";
export default function IsTeacherModal() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const setAuthData = useContext(authContext)[1];
  const { register, handleSubmit, watch } = useForm();
  const toast = useToast();

  const STUDENT_MESSAGE = "Please join a Grade.";
  const TEACHER_MESSAGE = "Please create a Grade.";
  const onSubmit = (data) => {
    axios.patch("/users", data).then((patchedUser) => {
      setAuthData({ ...patchedUser.data, isAuth: true });
      onClose();
      toast({
        title: "Welcome to Distancia!",
        isClosable: true,
        duration: 3000,
        status: "info",
        description: patchedUser.isTeacher ? TEACHER_MESSAGE : STUDENT_MESSAGE,
      });
    });
  };
  const disciplines = [
    "Computer Science",
    "Physics",
    "Math",
    "English",
    "Biology",
    "Chemistry",
    "Sociology",
    "Economy",
    "French",
    "Arabic",
  ];
  return (
    <>
      <input id="teacher-modal" type="hidden" onClick={onOpen} />
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Are you a Teacher?</ModalHeader>

          <ModalBody>
            <form id="is-teacher-form" onSubmit={handleSubmit(onSubmit)}>
              <Collapse in={watch("isTeacher")}>
                <FormControl isRequired={watch("isTeacher")}>
                  <FormLabel>Discipline:</FormLabel>
                  <Select
                    ref={register}
                    name="discipline"
                    placeholder="Select option"
                  >
                    {disciplines.map((discipline, key) => (
                      <option key={key} value={discipline}>
                        {discipline}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </Collapse>

              <FormControl
                display="flex"
                mt="6px"
                justifyContent="center"
                alignItems="flex-end"
              >
                <FormLabel m="0">I am a teacher</FormLabel>
                <Switch
                  ref={register}
                  ml="1rem"
                  mt="1rem"
                  name="isTeacher"
                  value="true"
                />
              </FormControl>
            </form>
          </ModalBody>

          <ModalFooter>
            {/*href={`${axios.defaults.baseURL}/auth/google`}*/}
            <Button
              type="submit"
              form="is-teacher-form"
              colorScheme="green"
              mr={3}
            >
              Proceed
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
