import React from "react";
import { CloseIcon } from "@chakra-ui/icons";
import axios from "axios";

export default function DeleteLecture({ lectureId, setLecturesData, gradeId }) {
  const deleteLecture = () => {
    axios
      .patch(`grades/${gradeId}?deleteLecture=true`, { lectureId })
      .then(() =>
        setLecturesData((prevLecturesData) => ({
          ...prevLecturesData,
          lectures: prevLecturesData.lectures.filter(
            (lecture) => lecture._id !== lectureId
          ),
        }))
      );
  };

  return (
    <CloseIcon
      onClick={deleteLecture}
      display="block"
      className="delete-lecture-icon"
    />
  );
}
