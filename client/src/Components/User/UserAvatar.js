import React, { useContext } from "react";
import { authContext } from "../../providers/AuthContext";
import { Avatar } from "@chakra-ui/react";
import axios from "axios";
export default function UserAvatar(props) {
  let authData = useContext(authContext)[0];
  let profile;
  if (props.profile || props.external) {
    profile = props.profile;
  } else {
    profile = authData.profile;
  }
  return (
    <Avatar
      {...props}
      src={profile ? `${axios.defaults.baseURL}/uploads/${profile}` : undefined}
      className="header-profile__avatar"
      ml="1rem"
      cursor="pointer"
    />
  );
}
