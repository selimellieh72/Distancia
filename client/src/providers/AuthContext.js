import React, { useState, createContext } from "react";
import axios from "axios";
export const authContext = createContext();

export function AuthProvider(props) {
  const [authInfo, setAuthInfo] = useState({
    isAuth: null,
    username: "",
    isTeacher: null,
    discipline: null,
  });
  async function getUser(history, location) {
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.get("/session", {
        withCredentials: true,
      });

      setAuthInfo({
        username: response.data.username,
        isTeacher: response.data.isTeacher,
        discipline: response.data.discipline,
        fullName: response.data.fullName,
        isAuth: true,
      });
      history.push(location.pathname);
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
