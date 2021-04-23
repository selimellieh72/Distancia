import React, { useEffect } from "react";

import {
  useToast,
  Checkbox,
  Wrap,
  WrapItem,
  FormHelperText,
  FormErrorMessage,
} from "@chakra-ui/react";

import axios from "axios";
import DatePicker from "../Core/DatePicker";

import { FormControl, FormLabel, Input, Textarea } from "@chakra-ui/react";
import UploadFiles from "../Core/UploadFiles";

export default function HomeworkForm(props) {
  function onSubmit(data) {
    function onData(res) {
      if (isEditting) {
        props.setHomeworkData(res.data);
      } else {
        props.setHomeworks((prevHomeworks) => [res.data, ...prevHomeworks]);
      }
      props.onClose();
      const status = isEditting ? "edited" : "added";
      toast({
        title: "Homework " + status,
        description: `The homework was successfully ${status} and is now visible for your students`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
    if (isEditting) {
      axios.patch(`/homeworks/${props.id}`, data).then((res) => onData(res));
    } else {
      axios
        .post("/homeworks", {
          ...data,
          grade: props.gradeId,
          chapter: props.chapterId,
        })
        .then((res) => onData(res));
    }
  }

  const isEditting = props.id && props.title && props.content;
  const toast = useToast();

  useEffect(() => {
    register("dueDate");
    register("files");

    register("isFileAttach");
    if (isEditting) {
      setTimeout(() => {
        setValue("title", props.title);
        setValue("content", props.content);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { register, handleSubmit, watch, errors, setValue } = props;

  return (
    <>
      <form id="homework-form" onSubmit={handleSubmit(onSubmit)}>
        <FormControl mb="9px" isRequired isInvalid={errors.title}>
          <FormLabel>Title:</FormLabel>
          <Input
            name="title"
            ref={(ref) => {
              register(ref, {
                maxLength: {
                  value: 15,
                  message:
                    "Your homework title can only contain a maximum of 15 characters.",
                },
              });
              props.initialRef.current = ref;
            }}
            placeholder="Physics"
          />
          <FormHelperText>
            {!errors.title &&
              "Your homework title will be visible to your students"}
          </FormHelperText>
          <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
        </FormControl>
        <FormControl mb="8px" isRequired isInvalid={errors.content}>
          <FormLabel>Content:</FormLabel>
          <Textarea
            name="content"
            ref={register({
              maxLength: {
                value: 264,
                message:
                  "Your homework content can only contain a maximum of 80 characters.",
              },
            })}
            placeholder="Page 36 do exercise 1."
            resize="none"
            rows="4"
          />
          <FormHelperText>
            {!errors.content &&
              "Your homework content will be visible to your students"}
          </FormHelperText>
          <FormErrorMessage>{errors.content?.message}</FormErrorMessage>
        </FormControl>
        <DatePicker
          defaultDate={watch("dueDate")}
          getDate={(date) => setValue("dueDate", date)}
        />

        <Wrap>
          <WrapItem>
            <Checkbox
              isChecked={props.isFileAttach}
              onChange={({ target }) => {
                setValue("isFileAttach", target.checked);

                if (target.checked === false) {
                  setValue("files", null);
                }
              }}
            >
              Attach files
            </Checkbox>
          </WrapItem>
          <WrapItem>
            <Checkbox ref={register} name="acceptAnswers">
              Accept answers
            </Checkbox>
          </WrapItem>
        </Wrap>
        {watch("isFileAttach") && (
          <UploadFiles
            files={props.files}
            getFileIds={(files) => setValue("files", files)}
            multiple
          />
        )}
      </form>
    </>
  );
}
