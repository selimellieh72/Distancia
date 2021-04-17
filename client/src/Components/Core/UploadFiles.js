import React, { useState, useRef } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Input, Button, Center, Progress, Container } from "@chakra-ui/react";
import { ReactComponent as PdfSvg } from "../../assets/svg/pdf.svg";

export default function UploadFiles(props) {
  const { register, handleSubmit } = useForm();
  const [UploadPercentage, setUploadPercentage] = useState(0);
  const [fileUploaded, setFileUploaded] = useState();

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
      .post("http://localhost:5000/upload", formData, config)
      .then((res) => props.getFileIds(res.data.files.map((f) => f.id)));
  };

  const hiddenFileInput = React.useRef(null);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handleChange = (event) => {
    setFileUploaded(Array.from(event.target.files));
    console.log(fileUploaded);
    register();
  };

  function customFileName(fileName) {
    if (fileName.length >= 36) {
      return fileName.substr(0, 33) + "...";
    } else {
      return fileName;
    }
  }

  return (
    <>
      <Input
        style={{ display: "none" }}
        colorScheme="red"
        required
        pt="3px"
        name="files"
        type="file"
        multiple={props.multiple ? "multiple" : false}
        // ref={register}
        ref={hiddenFileInput}
        onChange={handleChange}
      />
      <Center mt="2rem">
        <Button onClick={handleClick} colorScheme="blue">
          Upload
        </Button>
        {UploadPercentage !== 0 && (
          <Progress
            my="16px"
            colorScheme={UploadPercentage === 100 ? "green" : undefined}
            hasStripe={UploadPercentage !== 100}
            value={UploadPercentage}
          />
        )}
      </Center>
      <div className="uploaded-files">
        <ul className="uploaded-files__list">
          {fileUploaded?.map((file) => (
            <li className="uploaded-file">
              {" "}
              <PdfSvg />{" "}
              <p className="file-name">
                {customFileName(file.name.split(".")[0])}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
