import React, { useState, createContext } from "react";

export const authContext = createContext();

export function AuthProvider(props) {
  const [AuthInfo, setAuthInfo] = useState({
    isAuth: null,
    username: "",
    isTeacher: null,
    discipline: null,
  });
  return (
    <authContext.Provider value={[AuthInfo, setAuthInfo]}>
      {props.children}
    </authContext.Provider>
  );
}
