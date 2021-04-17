import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as FolderSvg } from "../../assets/svg/folder.svg";

export default function LectureCard(props) {
  const customTitle = (title) => {
    if (title.length >= 50) {
      return title.substr(0, 50) + "...";
    } else {
      return title;
    }
  };
  return (
    <>
      <Link to="/lecturedisplay">
        <div className="lecture-card">
          <FolderSvg className="lecture-card__class__icon" />
          <div className="card__details">
            <h1 className="lecture-card__title">
              {customTitle(
                "Chapitre 1 partie 1Chapitre 1 partie 1Chapitre 1 partie 1Chapitre1 partie 1Chapitre 1 partie 1"
              )}
            </h1>
          </div>
        </div>
      </Link>
    </>
  );
}
