import React from "react";
import { ReactComponent as FolderSvg } from "../../assets/svg/folder.svg";

export default function LectureCard(props) {
  return (
    <>
      <div className="card">
        <FolderSvg className="card__class__icon" />
        <div className="card__details">
          <h1 className="card__title">Chapitre 1 partie 1Chapitre 1 partie 1Chapitre 1 partie 1Chapitre 1 partie 1Chapitre 1 partie 1</h1>
        </div>
      </div>
    </>
  );
}
