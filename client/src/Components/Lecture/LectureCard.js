import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as FolderSvg } from "../../assets/svg/folder.svg";
import { ReactComponent as VideoSvg } from "../../assets/svg/video.svg";
import { FileIcon, defaultStyles } from "react-file-icon";

import { authContext } from "../../providers/AuthContext";
import DeleteLecture from "./DeleteLecture";

export default function LectureCard(props) {
  const isTeacher = React.useContext(authContext)[0].isTeacher;
  const customTitle = (title) => {
    if (title.length >= 50) {
      return title.substr(0, 50) + "...";
    } else {
      return title;
    }
  };
  const isVideo =
    props.extension === "mp4" ||
    props.extension === "mov" ||
    props.extension === "FLV";

  const baseURL =
    window.location.origin === "http://localhost:3000"
      ? "http://localhost:5000/api"
      : window.location.origin + "/api";

  const MyFileIcon = () => (
    <div className="lecture-card">
      {props.link || isVideo ? (
        <Link
          to={{
            pathname: "/video",
            state: {
              gradeId: props.gradeId,
              chapterId: props.chapterId,
              title: props.name,
              link: isVideo ? `${baseURL}/uploads/${props.fileId}` : props.link,
            },
          }}
        >
          <VideoSvg className="lecture-card__class__icon" />
        </Link>
      ) : props.extension === "pdf" ? (
        <Link
          to={{
            pathname: "/pdfReader",
            state: {
              title: props.name,
              pdfLink: `${baseURL}/uploads/${props.fileId}`,
              backPath: `/grades/${props.gradeId}/chapter/${props.chapterId}/lectures`,
            },
          }}
        >
          <div className="lecture-card__class__icon">
            <FileIcon
              extension={props.extension}
              {...defaultStyles[props.extension]}
            />
          </div>
        </Link>
      ) : (
        <a href={`${baseURL}/uploads/${props.fileId}`} download>
          <div className="lecture-card__class__icon">
            <FileIcon
              extension={props.extension}
              {...defaultStyles[props.extension]}
            />
          </div>
        </a>
      )}
    </div>
  );

  return (
    <>
      <div className="lecture-card">
        {isTeacher && props.deleteState && (
          <DeleteLecture
            lectureId={props.id}
            setLecturesData={props.setLecturesData}
            gradeId={props.gradeId}
          />
        )}
        <MyFileIcon />
        <div className="card__details">
          <h1 className="lecture-card__title">{props.name}</h1>
        </div>
      </div>
    </>
  );
}
