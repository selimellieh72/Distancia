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

import HomeworkForm from "./HomeworkForm";

export default function HomeworkModal(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  let setValue;

  const initialRef = useRef();

  const isEditting = props.id && props.title && props.content;
  const [hasChanged, setHasChanged] = useState(!isEditting);
  const [fileIds, setFileIds] = useState(null);
  const [isFileAttach, setIsFileAttach] = useState(false);
  const [date, setDate] = useState();

  function updateHasChanged(formTitle, formContent) {
    setHasChanged(formTitle !== props.title || formContent !== props.content);
  }

  const getSetValue = (mySetValue) => (setValue = mySetValue);
  const getDate = (myDate) => {
    setDate(myDate);
  };
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
            {isEditting ? "Edit Homework" : "Add Homework"}
          </ModalHeader>
          <ModalBody pb={6}>
            <HomeworkForm
              initialRef={initialRef}
              onClose={onClose}
              setHomeworkData={props.setHomeworkData}
              setHomeworks={props.setHomeworks}
              id={props.id}
              title={props.title}
              content={props.content}
              updateHasChanged={updateHasChanged}
              getSetValue={getSetValue}
              gradeId={props.gradeId}
              setFileIds={setFileIds}
              fileIds={fileIds}
              setIsFileAttach={setIsFileAttach}
              isFileAttach={isFileAttach}
              getDate={getDate}
              date={date}
            />
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={() => (isFileAttach ? setIsFileAttach(false) : null)}
              form="homework-form"
              type="submit"
              colorScheme="blue"
              mr={3}
              isDisabled={
                !hasChanged ||
                (isFileAttach && (!fileIds || fileIds.length === 0)) ||
                !date
              }
            >
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
