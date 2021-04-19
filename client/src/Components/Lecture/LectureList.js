import React, { useState, useEffect } from "react";
import axios from "axios";

import ShowFiles from "../Core/ShowFiles";

export default function LectureList(props) {
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

  return (
    <ShowFiles
      files={props.lecturesData?.lectures?.map((lecture) => {
        return {
          name: lecture.title,
          extension: lecture.file?.filename?.split(".")[1] ?? undefined,
          link: lecture.link ?? undefined,
          id: lecture.file?._id,
        };
      })}
      titleNoExtension
      big
    />
  );
}
