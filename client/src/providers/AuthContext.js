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
      axios.defaults.withCredentials = true;
      const response = await axios.get("/session", {
        withCredentials: true,
      });

      setAuthInfo({
        ...response.data,
        isAuth: true,
      });
      console.log(response.data);
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
