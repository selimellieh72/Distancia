import React from "react";

import { Wrap, WrapItem } from "@chakra-ui/react";
import { FileIcon, defaultStyles } from "react-file-icon";

export default function ShowFiles(props) {
  function customFileName(fileName) {
    if (fileName.length >= 10) {
      return fileName.substr(0, 7) + "...";
    } else {
      return fileName;
    }
  }

  const baseURL =
    window.location.origin === "http://localhost:3000"
      ? "http://localhost:5000/api"
      : window.location.origin + "/api";

  return (
    <Wrap>
      {props.files?.map((file) => {
        const [fileName, fileExtension] = file.name.split(".");

        const MyFileIcon = () => (
          <div style={{ height: "52px", width: "52px" }}>
            <FileIcon
              extension={fileExtension}
              {...defaultStyles[fileExtension]}
            />
          </div>
        );

        return (
          <WrapItem>
            <div>
              {!props.notDownloadable ? (
                <a href={`${baseURL}/uploads/${file.id}`} download>
                  <MyFileIcon />
                </a>
              ) : (
                <MyFileIcon />
              )}
              <p style={{ marginTop: "1rem" }}>{customFileName(fileName)}</p>
            </div>
          </WrapItem>
        );
      })}
    </Wrap>
  );
}
