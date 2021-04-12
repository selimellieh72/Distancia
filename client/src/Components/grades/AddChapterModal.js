import React from "react";
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

export default function AddChapterModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit } = useForm();

  return (
    <>
      <Button width="125px" mr="2rem" colorScheme="blue" onClick={onOpen}>
        Add Chapter
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Chapter</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <form id="join-grade" >
                <FormLabel>Chapter name: </FormLabel>
                <Input
                  name="title"
                ></Input>
              </form>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <ButtonGroup>
              <Button type="submit" form="join-grade" colorScheme="blue">
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
