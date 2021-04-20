import React, { useState, useEffect } from "react";
import { authContext } from "../../providers/AuthContext";
import axios from "axios";
import LectureCard from "./LectureCard";
import {ReactComponent as NoLectureSvg} from "../../assets/svg/open-book.svg";

export default function LectureList(props) {
  const lecturesLength = props.lecturesData?.lectures !== 0;
  useEffect(
    () =>
      axios
        .get(
          `/grades/${props.gradeId}/lectures?${
            props.chapterId ? `chapter=${props.chapterId}` : ""
          }`
        )
        .then((res) => props.setLecturesData(res.data)),
    []
  );

  return lecturesLength ? (
    <div className="card-list">
      {props.lecturesData?.lectures?.map((lecture) => (
        <LectureCard
          name={lecture.title}
          extension={lecture.file?.filename?.split(".")[1] ?? undefined}
          link={lecture.link ?? undefined}
          id={lecture?._id}
          gradeId={props.gradeId}
          chapterId={props.chapterId}
        />
      ))}
    </div>
  ) : (
    <div className="list-empty">
      <NoLectureSvg />
      {props.isTeacher ? (
        <p className="list-empty__text">
          No Lectures Found <br />
          Add Your Lectures
        </p>
      ) : (
        <p className="list-empty__text">
          No Lectures <br /> Found
        </p>
      )}
    </div>
  );
}
