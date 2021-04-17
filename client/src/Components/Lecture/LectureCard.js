import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as PdfSvg } from "../../assets/svg/pdf.svg";

export default function LectureCard(props) {
  return (
    <>
      <div className="card">
        <Link to="/lecturedisplay">
          <PdfSvg className="card__class__icon" />
          <div className="card__details">
            <h1 className="card__title">Physics</h1>
          </div>
        </Link>
      </div>
    </>
  );
}
