import React, { useRef, useState } from "react";
import { Avatar } from "@chakra-ui/react";
export default function UploadImage(props) {
  const hiddenFileInput = useRef();

  const [imagePreview, setImagePreview] = useState();

  const upload = () => {
    hiddenFileInput.current.click();
  };

  const onChange = (event) => {
    const image = event.target.files[0];
    const imagePreview = URL.createObjectURL(image);
    props.getImage(image);
    setImagePreview(imagePreview);
  };

  return (
    <>
      <input
        ref={hiddenFileInput}
        hidden
        name="image"
        type="file"
        name="myImage"
        accept="image/x-png,image/gif,image/jpeg"
        onChange={onChange}
      />
      <Avatar
        src={imagePreview || props.defaultImage}
        style={{ cursor: "pointer" }}
        size="xl"
        onClick={upload}
      />
    </>
  );
}
