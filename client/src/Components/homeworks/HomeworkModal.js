import React, { useEffect, useRef, useState } from "react";

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
  ModalCloseButton,
} from "@chakra-ui/react";

import HomeworkForm from "./HomeworkForm";

export default function HomeworkModal(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  let setValue;

  const initialRef = useRef();

  const isEditting = props.id && props.title && props.content && props.dueDate;
  const [hasChanged, setHasChanged] = useState(!isEditting);
  const initialFileIds = props.files?.map((f) => f._id);
  const [fileIds, setFileIds] = useState(initialFileIds);

  const [isFileAttach, setIsFileAttach] = useState(
    props.files && props.files.length > 0
  );

  // useEffect(() => {
  //   // console.log(initialFileIds, fileIds);
  //   setHasChanged(
  //     (hasChanged) => isFileAttach && JSON.stringify(initialFileIds) !== fileIds
  //   );
  // }, [fileIds]);

  useEffect(() => console.log(hasChanged), [hasChanged]);

  const [date, setDate] = useState(
    props.dueDate ? new Date(props.dueDate) : new Date()
  );

  function updateHasChanged(formTitle, formContent, acceptAnswers, myDate) {
    setHasChanged(
      formTitle !== props.title ||
        (myDate ? myDate.getTime() : date.getTime()) !==
          new Date(props.dueDate).getTime() ||
        formContent !== props.content ||
        props.acceptAnswers !== acceptAnswers
    );
  }

  const getSetValue = (mySetValue) => (setValue = mySetValue);
  const getDate = (myDate, formTitle, formContent, acceptAnswers) => {
    setDate(myDate);

    // if (isEditting)
    //   updateHasChanged(formTitle, formContent, acceptAnswers, myDate);
  };

  const openModal = () => {
    if (isEditting) {
      if (setValue) {
        setValue("title", "");
        setValue("content", "");
      }
      setHasChanged(false);
      setDate(new Date(props.dueDate));
    } else {
      setFileIds(null);
      setDate(new Date());
    }
    if (isFileAttach && (!props.files || props.files.length === 0))
      setIsFileAttach(false);

    onOpen();
  };
  return (
    <>
      {props.button ? (
        <IconButton
          className="page-header__icon__button"
          icon={<props.icon />}
          onClick={openModal}
        />
      ) : (
        <props.icon onClick={openModal} />
      )}
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <ModalCloseButton />
            {isEditting ? "Edit Homework" : "Add Homework"}
          </ModalHeader>
          <ModalBody pb={6}>
            <HomeworkForm
              chapterId={props.chapterId}
              initialRef={initialRef}
              onClose={onClose}
              setHomeworkData={props.setHomeworkData}
              setHomeworks={props.setHomeworks}
              files={props.files}
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
              onClick={() => {
                if (isFileAttach) {
                  setIsFileAttach(false);
                }
              }}
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
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
