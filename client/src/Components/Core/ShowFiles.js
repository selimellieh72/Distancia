import React from "react";

import { Wrap, WrapItem } from "@chakra-ui/react";
import { FileIcon, defaultStyles } from "react-file-icon";

export default function ShowFiles(props) {
  function customFileName(fileName) {
    if (fileName.length >= 20) {
      return fileName.substr(0, 17) + "...";
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
        const fullName = file.name || file.filename;
        const fileId = file.id || file._id;
        const [fileName, fileExtension] = fullName.split(".");

        const MyFileIcon = () => (
          <div style={{ height: "52px", width: "52px" }}>
            <FileIcon
              extension={fileExtension}
              {...defaultStyles[fileExtension]}
            />
          </div>
        );

        return (
          <WrapItem key={fileId}>
            <div
              style={{
                marginTop: "1rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {!props.notDownloadable ? (
                <a href={`${baseURL}/uploads/${fileId}`} download>
                  <MyFileIcon />
                </a>
              ) : (
                <MyFileIcon />
              )}
              <p className="file-name">
                {customFileName(fileName)}
              </p>
            </div>
          </WrapItem>
        );
      })}
    </Wrap>
  );
}
