import React from "react";
import { Link, useHistory } from "react-router-dom";
import { ReactComponent as FolderSvg } from "../../assets/svg/folder.svg";
import { ReactComponent as VideoSvg } from "../../assets/svg/video.svg";
import { FileIcon, defaultStyles } from "react-file-icon";

export default function LectureCard(props) {
  const history = useHistory();
  const customTitle = (title) => {
    if (title.length >= 50) {
      return title.substr(0, 50) + "...";
    } else {
      return title;
    }
  };

  const baseURL =
    window.location.origin === "http://localhost:3000"
      ? "http://localhost:5000/api"
      : window.location.origin + "/api";

  const MyFileIcon = () => (
    <div className="lecture-card">
      {props.link ? (
        // <Link
        //   to={{
        //     pathname: "/video",
        //     state: { title: props.name, link: props.link },
        //   }}
        // >
        <VideoSvg
          onClick={() =>
            history.push(`/video/${props.id}`, {
              gradeId: props.gradeId,
              chapterId: props.chapterId,
              title: props.name,
              link: props.link,
            })
          }
          className="lecture-card__class__icon"
        />
      ) : (
        // </Link>
        <FileIcon
          className="lecture-card__class__icon"
          // extension={fileExtension}
          // {...defaultStyles[fileExtension]}
        />
      )}
    </div>
  );

  return (
    <>
      {/* <Link to="/lecturedisplay"> */}
      <div className="lecture-card">
        <MyFileIcon />
        <div className="card__details">
          <h1 className="lecture-card__title">{props.name}</h1>
        </div>
      </div>
      {/* </Link> */}
    </>
  );
}
