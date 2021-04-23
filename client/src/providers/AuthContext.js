import React, { useState, createContext } from "react";
import axios from "axios";
export const authContext = createContext();

export function AuthProvider(props) {
  const [authInfo, setAuthInfo] = useState({
    isAuth: null,
    username: "",
    isTeacher: null,
    discipline: null,
    profile: null,
  });
  async function getUser(history, location) {
    try {
      const response = await axios.get("/session", {
        withCredentials: true,
      });

      setAuthInfo({
        ...response.data,
        isAuth: true,
      });

      history.push(location.pathname);

      if (response.data.isTeacher === undefined) {
        setTimeout(() => document.getElementById("teacher-modal").click(), 100);
      }
    } catch (e) {
      setAuthInfo({ ...authInfo, isAuth: false });
      console.log(e.response);
    }
  }
  return (
    <authContext.Provider value={[authInfo, setAuthInfo, getUser]}>
      {props.children}
    </authContext.Provider>
  );
}
