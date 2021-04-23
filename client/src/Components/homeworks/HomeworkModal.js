import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
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
  const { register, handleSubmit, setValue, watch, errors } = useForm();

  const initialRef = useRef();

  function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

  const isEditting = props.id && props.title && props.content && props.dueDate;

  const openModal = () => {
    onOpen();
    setTimeout(() => {
      if (isEditting) {
        setValue("title", "");
        setValue("content", "");

        setValue("dueDate", props.dueDate);
        setValue("files", props.initialFileIds);
        setValue("isFileAttach", props.files && props.files.length > 0);
      } else {
        setValue("files", []);
        setValue("dueDate", new Date());
      }
      if (watch("isFileAttach") && (!watch("files") || watch("files") === 0))
        setValue("isFileAttach", false);
    });
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
              register={register}
              handleSubmit={handleSubmit}
              watch={watch}
              errors={errors}
              setValue={setValue}
              chapterId={props.chapterId}
              initialRef={initialRef}
              onClose={onClose}
              setHomeworkData={props.setHomeworkData}
              setHomeworks={props.setHomeworks}
              id={props.id}
              title={props.title}
              content={props.content}
              gradeId={props.gradeId}
              files={props.files}
            />
          </ModalBody>

          <ModalFooter>
            <Button
              // onClick={() => {
              //   if (isFileAttach) {
              //     setIsFileAttach(false);
              //   }
              // }}
              form="homework-form"
              type="submit"
              colorScheme="blue"
              mr={3}
              isDisabled={
                (watch("isFileAttach") &&
                  (!watch("files") || watch("files").length === 0)) ||
                (isEditting &&
                  watch("title") === props.title &&
                  watch("content") === props.content &&
                  watch("dueDate").getTime() === props.dueDate.getTime() &&
                  watch("files") &&
                  arraysEqual(watch("files"), props.initialFileIds))
              }
              // isDisabled={
              //   !hasChanged
              //   // ||
              //   // (isFileAttach && (!fileIds || fileIds.length === 0)) ||
              //   // !date
              // }
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
