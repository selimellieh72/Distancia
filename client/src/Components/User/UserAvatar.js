import React, { useContext } from "react";
import { authContext } from "../../providers/AuthContext";
import { Avatar } from "@chakra-ui/react";
import axios from "axios";

export default function UserAvatar(props) {
  let authData = useContext(authContext)[0];
  let profile;
  let displayUrl;
  if (props.profile || props.external) {
    profile = props.profile;
  } else {
    profile = authData.profile;
  }

  if (profile)
    displayUrl =
      profile.startsWith("http") || profile.startsWith("https")
        ? profile
        : `${axios.defaults.baseURL}/uploads/${profile}`;

  return (
    <Avatar
      {...props}
      src={profile ? displayUrl : undefined}
      className="header-profile__avatar"
      cursor="pointer"
    />
  );
}
