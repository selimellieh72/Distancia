import React, { useContext } from "react";
import { authContext } from "../../providers/AuthContext";
import { Avatar } from "@chakra-ui/react";
import axios from "axios";
export default function UserAvatar(props) {
  const { profile } = useContext(authContext)[0];
  return (
    <Avatar
      {...props}
      src={`${axios.defaults.baseURL}/uploads/${profile}`}
      className="header-profile__avatar"
      ml="1rem"
      cursor="pointer"
    />
  );
}
