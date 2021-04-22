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
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";

export default function AddChapterModal(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit, errors } = useForm();
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
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Chapter</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isInvalid={errors.title} isRequired>
              <form id="add-chapter" onSubmit={handleSubmit(onSubmit)}>
                <FormLabel>Chapter name: </FormLabel>
                <Input
                  name="title"
                  ref={register({
                    maxLength: {
                      value: 50,
                      message:
                        "Your chapter title can only contain a maximum of 50 characters.",
                    },
                    minLength: {
                      value: 10,
                      message:
                        "Your chapter title should be atleast 10 characters long",
                    },
                  })}
                />
                <FormHelperText>
                  {!errors.title &&
                    "Your chapter title will be visible to your students."}
                </FormHelperText>
                <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
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
