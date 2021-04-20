import React from "react";

import { Link } from "react-router-dom";
import { Wrap, WrapItem, Heading } from "@chakra-ui/react";
import { FileIcon, defaultStyles } from "react-file-icon";
import { ReactComponent as VideoSvg } from "../../assets/svg/video.svg";
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
    <div classname="card-list">
      {props.files?.map((file) => {
        let fileName, fileExtension;
        if (props.titleNoExtension) {
          fileName = file.name;
          fileExtension = file.extension;
        } else {
          [fileName, fileExtension] = file.name.split(".");
        }

        const MyFileIcon = () => (
          <div>
            {file.link ? (
              <Link
                to={{
                  pathname: "/video",
                  state: { title: fileName, link: file.link },
                }}
              >
                <VideoSvg style={{ height: "40pt", width: "40pt" }} />
              </Link>
            ) : (
              <div style={{ height: "52px", width: "52px" }}>
                <FileIcon
                  extension={fileExtension}
                  {...defaultStyles[fileExtension]}
                />
              </div>
            )}
          </div>
        );
        return (
          <WrapItem>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {!props.notDownloadable && !file.link ? (
                <a href={`${baseURL}/uploads/${file.id}`} download>
                  <MyFileIcon />
                </a>
              ) : (
                <MyFileIcon />
              )}
              {props.lecture ? (
                <Heading mt="1rem" as="h1" textAlign="center">
                  {customFileName(fileName)}
                </Heading>
              ) : (
                <p style={{ marginTop: "1rem" }}>{customFileName(fileName)}</p>
              )}
            </div>
          </WrapItem>
        );
      })}
    </div>
  );
}
