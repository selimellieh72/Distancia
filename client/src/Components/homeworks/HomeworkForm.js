import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useToast, Checkbox, Wrap, WrapItem } from "@chakra-ui/react";
import axios from "axios";
import DatePicker from "../Core/DatePicker";

import { FormControl, FormLabel, Input, Textarea } from "@chakra-ui/react";
import UploadFiles from "../Core/UploadFiles";

export default function HomeworkForm(props) {
  function onSubmit(data) {
    function onData(res) {
      if (isEditting) {
        props.setHomeworkData((prevData) => ({ prevData, ...data }));
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
          fileIds: props.fileIds ? props.fileIds : undefined,
          dueDate: props.date,
        })
        .then((res) => onData(res));
    }
  }

  const getFileIds = (gottenfileIds) => {
    props.setFileIds(gottenfileIds);
  };
  const { register, handleSubmit, setValue, watch } = useForm();
  const isEditting = props.id && props.title && props.content;
  const toast = useToast();
  props.getSetValue(setValue);
  useEffect(() => {
    if (isEditting) {
      setValue("title", props.title);
      setValue("content", props.content);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <form id="homework-form" onSubmit={handleSubmit(onSubmit)}>
        <FormControl mb="9px" isRequired>
          <FormLabel>Title:</FormLabel>
          <Input
            name="title"
            ref={(ref) => {
              register(ref);
              props.initialRef.current = ref;
            }}
            placeholder="Physics"
            onChange={() =>
              props.updateHasChanged(watch("title"), watch("content"))
            }
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Content:</FormLabel>
          <Textarea
            name="content"
            ref={register}
            placeholder="Page 36 do exercise 1."
            resize="none"
            rows="4"
            onChange={() =>
              props.updateHasChanged(watch("title"), watch("content"))
            }
          />
          <div className="homework-form__datepicker">
            <DatePicker getDate={props.getDate} />
          </div>
        </FormControl>

        {!isEditting && (
          <Wrap>
            <WrapItem>
              <Checkbox
                onChange={({ target }) => {
                  props.setIsFileAttach(target.checked);
                  if (target.checked === false) {
                    props.setFileIds(null);
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
        )}
        {props.isFileAttach && <UploadFiles getFileIds={getFileIds} />}
      </form>
    </>
  );
}
