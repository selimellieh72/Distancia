import React, { useContext } from "react";
import { authContext } from "../../providers/AuthContext";
import { ReactComponent as NoMeetingSvg } from "../../assets/svg/videoconference.svg";

export default function MeetingList() {
  const isTeacher = useContext(authContext)[0].isTeacher;
  return (
    <>
      <div className="list-empty">
        <NoMeetingSvg />

        {isTeacher ? (
          <p className="list-empty__text">
            No Meetings Found <br />
            Add Your First Meeting
          </p>
        ) : (
          <p className="list-empty__text">
            No Meetings <br /> Found
          </p>
        )}
      </div>
    </>
  );
}
