import React, { useState, useRef } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import { Button, Center, CircularProgress } from "@chakra-ui/react";

import ShowFiles from "./ShowFiles";

export default function UploadFiles(props) {
  const [fileUploaded, setFileUploaded] = useState();
  const [isLoading, setIsLoading] = useState();
  const [maxLengthError, setMaxLengthError] = useState(false);
  const MAX_LENGTH = 5;

  const submit = (files) => {
    const formData = new FormData();
    files.forEach((f) => formData.append("files", f));
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    setIsLoading(true);
    axios.post("/upload", formData, config).then((res) => {
      setIsLoading(false);
      props.getFileIds(res.data.files.map((f) => f.id));
    });
  };

  const hiddenFileInput = useRef(null);

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleChange = (event) => {
    props.getFileIds([]);
    const files = Array.from(event.target.files);
    if (files.length > 5) {
      setMaxLengthError(true);
      setFileUploaded([]);
      return;
    }
    if (maxLengthError) {
      setMaxLengthError(false);
    }
    setFileUploaded(files);
    submit(files);
  };

  return (
    <>
      <input
        style={{ display: "none" }}
        name="files"
        type="file"
        multiple={props.multiple ? "true" : false}
        ref={hiddenFileInput}
        onChange={handleChange}
      />
      <Center mt="2rem">
        <Button py="6" onClick={handleClick} colorScheme="blue">
          {isLoading ? (
            <CircularProgress isIndeterminate color="green.300" />
          ) : (
            "Upload"
          )}
        </Button>
      </Center>
      {maxLengthError && (
        <span style={{ color: "red" }}>
          You are only allowed to upload a number of 5 files.
        </span>
      )}

      <div
        style={{
          display: !fileUploaded || fileUploaded === 0 ? "none" : undefined,
        }}
        className="uploaded-files"
      >
        <ShowFiles
          files={fileUploaded?.map((f) => {
            f.id = uuidv4();
            return f;
          })}
        />
      </div>
    </>
  );
}
