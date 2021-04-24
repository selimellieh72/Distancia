import React from "react";
import { useLocation } from "react-router-dom";
import { Container } from "@chakra-ui/react";
import ReactPlayer from "react-player";
import PageHeader from "../Components/Core/PageHeader";

export default function VideoPlayer() {
  const { title, link, gradeId, chapterId } = useLocation().state || {};
  let backPath;
  if (gradeId) {
    backPath = "/grades/" + gradeId;
    if (chapterId) {
      backPath = backPath + "/chapter/" + chapterId + "/lectures";
    }
  }

  backPath = backPath ?? "" + "/lectures";

  return (
    <Container maxW="container.lg" p="18px" width="100%" height="590px">
      <PageHeader title={title} pathName={backPath} />
      <ReactPlayer controls={true} width="100%" height="100%" url={link} />
    </Container>
  );
}
