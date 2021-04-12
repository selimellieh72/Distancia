import React, { useContext } from "react";
import { authContext } from "../../providers/AuthContext";
import { ReactComponent as NoLectureSvg } from "../../assets/svg/open-book.svg";
import LectureCard from "./LectureCard"

export default function LectureList() {
  const isTeacher = useContext(authContext)[0].isTeacher;
  return (
    <>
    <div className="card-list">
    <LectureCard />
    <LectureCard />
    <LectureCard />
    <LectureCard />
    <LectureCard />
    <LectureCard />
    <LectureCard />
    <LectureCard />
    <LectureCard />
    <LectureCard />
    </div>
      {/* <div className="list-empty">
        <NoLectureSvg />

        {isTeacher ? (
          <p className="list-empty__text">
            No Lectures Found <br />
            Add Your Lectures
          </p>
        ) : (
          <p className="list-empty__text">
            No Lectures <br /> Found
          </p>
        )}
      </div> */}
    </>
  );
}
