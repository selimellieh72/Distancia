import React, { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  FormErrorMessage,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  Button,
  IconButton,
  RadioGroup,
  Radio,
  Input,
  FormLabel,
  FormControl,
  FormHelperText,
  useToast,
} from "@chakra-ui/react";

import UploadFiles from "../Core/UploadFiles";

export default function LectureModal(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { errors, setValue, register, handleSubmit, reset } = useForm();
  const initialRef = useRef();

  const [documentType, setDocumentType] = useState("link");
  const toast = useToast();
  const onSubmit = (data) => {
    const lecture = {
      title: data.title,
      chapter: props.chapterId,
      file: documentType === "file" ? data.file[0] : undefined,
      link: documentType === "link" ? data.link : undefined,
    };
    return axios
      .patch(`/grades/${props.gradeId}?addLecture=true`, lecture)
      .then((res) => {
        onClose();
        toast({
          title: "Lecture added!",
          description: `The lecture with the title ${data.title} was successfully added.`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        props.setLecturesData((lectureData) => ({
          ...lectureData,
          lectures: [...lectureData.lectures, res.data],
        }));
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    register("file", {
      validate: (val) =>
        (val && val.length > 0) ||
        documentType !== "file" ||
        "Please upload the file before adding the lectures.",
    });
  });
  const openModal = () => {
    reset();
    onOpen();
  };
  return (
    <>
      {props.button ? (
        <IconButton icon={<props.icon />} onClick={openModal} />
      ) : (
        <props.icon onClick={openModal} />
      )}
      <Modal
        closeOnOverlayClick={false}
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Lecture</ModalHeader>
          <ModalBody pb={6}>
            <form id="lecture-form" onSubmit={handleSubmit(onSubmit)}>
              <FormControl isInvalid={errors.title} mb="9px" isRequired>
                <FormLabel>Title:</FormLabel>
                <Input
                  name="title"
                  ref={register({
                    maxLength: {
                      value: 64,
                      message:
                        "Your lecture title should contain a maximum of 64 characters",
                    },
                  })}
                />
                <FormHelperText>
                  {!errors.title &&
                    "Your lecture title that will be shown to your students."}
                </FormHelperText>
                <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
              </FormControl>

              <RadioGroup
                value={documentType}
                onChange={setDocumentType}
                display="flex"
                justifyContent="space-evenly"
              >
                <Radio
                  onClick={() => setValue("file", [])}
                  value="link"
                  checked="checked"
                >
                  Video Link
                </Radio>
                <Radio onClick={() => setValue("link", "")} value="file">
                  File
                </Radio>
              </RadioGroup>
              {documentType === "link" && (
                <FormControl isInvalid={errors.link} mt="1.5rem" isRequired>
                  <FormLabel>Link: </FormLabel>
                  <Input
                    name="link"
                    ref={register({
                      validate: (val) => {
                        const p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
                        if (val.match(p) || documentType !== "link") {
                          return true;
                        } else {
                          return "Please enter a correct youtube video url";
                        }
                      },
                    })}
                    placeholder="https://google.com"
                  />
                  <FormHelperText>
                    {!errors.link && "Your lecture video url."}
                  </FormHelperText>
                  <FormErrorMessage>{errors.link?.message}</FormErrorMessage>
                </FormControl>
              )}
              {documentType === "file" && (
                <>
                  <UploadFiles
                    errorMessage={errors.file?.message}
                    getFileIds={(fileIds) => setValue("file", fileIds)}
                  />
                </>
              )}
            </form>
          </ModalBody>

          <ModalFooter>
            <Button form="lecture-form" type="submit" colorScheme="blue" mr={3}>
              Add
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
