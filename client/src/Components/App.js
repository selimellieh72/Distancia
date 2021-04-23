import React, { useContext, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";

import { authContext } from "../providers/AuthContext";

import CircularProgessIndicator from "./Core/CircularProgessIndicator";

import Router from "../Router";
import Header from "./header/Header";
import IsTeacherModal from "./User/isTeacherModal";

export default function App() {
  const [authInfo, , getUser] = useContext(authContext);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    getUser(history, location);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main>
      {authInfo.isAuth === null ? (
        <CircularProgessIndicator />
      ) : (
        <>
          <Header />
          <Router isAuth={authInfo.isAuth} isTeacher={authInfo.isTeacher} />
          <IsTeacherModal />
        </>
      )}
    </main>
  );
}
