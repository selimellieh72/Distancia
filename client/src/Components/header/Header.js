import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import Logo from "./header_logo/Logo";
import { Link } from "react-router-dom";
import { authContext } from "../../providers/AuthContext";
import UserPopover from "../User/UserPopover";

export default function Header() {
  const authData = useContext(authContext)[0];
  const isHome = useLocation().pathname === "/";

  return (
    <header className="main-header">
      <div className="main-header__content">
        <Logo />
        {authData.isAuth && <UserPopover />}
        {/* {authData.isAuth && <Logout />} */}

        {isHome ? (
          <Link to="/login" className="main-header__join">
            SignIn
          </Link>
        ) : null}
      </div>
    </header>
  );
}
