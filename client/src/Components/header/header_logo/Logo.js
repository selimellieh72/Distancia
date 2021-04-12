import React from "react";
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link className="main-header__title" to="/">
      <h1 >Distancia</h1>
    </Link>
  );
}
