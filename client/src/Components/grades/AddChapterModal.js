import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
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
  ButtonGroup,
} from "@chakra-ui/react";

export default function AddChapterModal(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit } = useForm();
  const toast = useToast();

  const onSubmit = (data) => {
    const body = {
      title: data.title,
    };
    axios
      .patch(`/grades/${props.gradeId}?addChapter=true`, body)
      .then((res) => {
        props.addChapter({ ...body, _id: res.data.chapter_id });
        onClose();
        toast({
          duration: 4000,
          status: "success",
          isClosable: true,
          title: "Added chapter",
          description: `Successfuly added chapter of title '${data.title}'`,
        });
      });
  };

  return (
    <>
      <Button width="125px" colorScheme="blue" onClick={onOpen}>
        Add Chapter
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Chapter</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <form id="add-chapter" onSubmit={handleSubmit(onSubmit)}>
                <FormLabel>Chapter name: </FormLabel>
                <Input name="title" ref={register}></Input>
              </form>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <ButtonGroup>
              <Button type="submit" form="add-chapter" colorScheme="blue">
                Add Chapter
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
