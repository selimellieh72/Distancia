import React from "react";

import LectureCard from "./LectureCard";

export default function LectureList() {
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
