import React, { useRef, useState } from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  Button,
  IconButton,
} from "@chakra-ui/react";
import LectureForm from "./LectureForm";
import UploadFiles from "../Core/UploadFiles";

export default function LectureModal(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  let setValue;

  const initialRef = useRef();

  const isEditting = props.id && props.title && props.content;
  const [hasChanged, setHasChanged] = useState(!isEditting);
  const [isFileAttach, setIsFileAttach] = useState(false);

  return (
    <>
      {props.button ? (
        <IconButton icon={<props.icon />} onClick={onOpen} />
      ) : (
        <props.icon onClick={onOpen} />
      )}
      <Modal
        closeOnOverlayClick={false}
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {isEditting ? "Edit Lecture" : "Add Lecture"}
          </ModalHeader>
          <ModalBody pb={6}>
            <LectureForm />
            <UploadFiles multiple="true" />
          </ModalBody>

          <ModalFooter>
            <Button form="lecture-form" type="submit" colorScheme="blue" mr={3}>
              {isEditting ? "Edit" : "Add"}
            </Button>
            <Button
              onClick={() => {
                if (isEditting) {
                  setValue("title", "");
                  setValue("content", "");
                  setHasChanged(false);
                }
                if (isFileAttach) setIsFileAttach(false);
                onClose();
              }}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
