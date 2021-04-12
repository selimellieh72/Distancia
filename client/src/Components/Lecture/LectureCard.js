import React, { useContext } from "react";
import { authContext } from "../../providers/AuthContext";
import { ReactComponent as PdfSvg } from "../../assets/svg/pdf.svg";
import { Link } from "react-router-dom";

export default function LectureCard(props) {
  const btnRef = React.useRef();
  const { isTeacher } = useContext(authContext)[0];

  return (
    <>
      <div className="card">
        {/* <Link to="/lecturedisplay"> */}
          <PdfSvg className="card__class__icon" />
          <div className="card__details">
            <h1 className="card__title">Physics</h1>
          </div>
        {/* </Link> */}
      </div>
    </>
  );
}
