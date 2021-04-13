import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Input, Button, Center, Progress } from "@chakra-ui/react";
export default function UploadFiles(props) {
  const { register, handleSubmit } = useForm();
  const [UploadPercentage, setUploadPercentage] = useState(0);

  const onSubmit = (data) => {
    const formData = new FormData();
    Array.from(data.files).forEach((f) => formData.append("files", f));

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) =>
        setUploadPercentage(
          Math.round((progressEvent.loaded * 100) / progressEvent.total)
        ),
    };
    axios
      .post("/upload", formData, config)
      .then((res) => props.getFileIds(res.data.files.map((f) => f.id)));
  };
  return (
    <>
      <Input
        required
        pt="3px"
        name="files"
        type="file"
        multiple={props.multiple ? "multiple" : false}
        ref={register}
      />

      {UploadPercentage !== 0 && (
        <Progress
          my="16px"
          colorScheme={UploadPercentage === 100 ? "green" : undefined}
          hasStripe={UploadPercentage !== 100}
          value={UploadPercentage}
        />
      )}
      <Center mt="16px">
        <Button
          disabled={UploadPercentage === 100}
          onClick={handleSubmit(onSubmit)}
          colorScheme="green"
        >
          Upload
        </Button>
      </Center>
    </>
  );
}
