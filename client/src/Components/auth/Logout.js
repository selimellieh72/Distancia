import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { authContext } from "../../providers/AuthContext";
import { Button } from "@chakra-ui/react";

export default function Logout() {
  const setAuthData = useContext(authContext)[1];
  const history = useHistory();
  function logOut(event) {
    axios.post("/logout");
    setAuthData({ username: "", isAuth: false });
    history.push("/");
    event.preventDefault();
  }
  return (
    <Button onClick={logOut} colorScheme="blue">
      Logout
    </Button>
  );
}
