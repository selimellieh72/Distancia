import React, { useContext } from "react";
import Logo from "./header_logo/Logo";
import { Link } from "react-router-dom";
import { authContext } from "../../providers/AuthContext";
import UserPopover from "../User/UserPopover";

export default function Header(props) {
  const authData = useContext(authContext)[0];

  return (
    <header className="main-header">
      <div className="main-header__content">
        <Logo />
        {authData.isAuth && <UserPopover />}
        {/* {authData.isAuth && <Logout />} */}

        {props.homepage ? (
          <Link to="/login" className="main-header__join">
            SignIn
          </Link>
        ) : null}
      </div>
    </header>
  );
}
