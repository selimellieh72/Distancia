import React from "react";
import { FileIcon, defaultStyles } from "react-file-icon";

export default function ShowFiles(props) {
  function customFileName(fileName) {
    if (fileName.length >= 36) {
      return fileName.substr(0, 33) + "...";
    } else {
      return fileName;
    }
  }

  const baseUrl = "http://localhost:3000"
    ? "http://localhost:5000/api"
    : window.location.origin + "/api";

  console.log(props.files);
  return (
    <ul className="uploaded-files__list">
      {props.files?.map((file) => {
        const [fileName, fileExtension] = file.name.split(".");
        const MyFileIcon = () => (
          <div>
            <FileIcon
              extension={fileExtension}
              {...defaultStyles[fileExtension]}
            />
            <p className="file-name">{customFileName(fileName)}</p>
          </div>
        );
        return (
          <li key={file.id} className="uploaded-file">
            {" "}
            {props.downloadable ? (
              <a href={`${baseUrl}/uploads/${file.id}`} download>
                <MyFileIcon />
              </a>
            ) : (
              <MyFileIcon />
            )}
          </li>
        );
      })}
    </ul>
  );
}
