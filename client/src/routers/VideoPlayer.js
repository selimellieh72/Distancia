import React from "react";
import { useLocation } from "react-router-dom";
import { Container } from "@chakra-ui/react";
import ReactPlayer from "react-player";
import PageHeader from "../Components/Core/PageHeader";

export default function VideoPlayer() {
  const { title, link } = useLocation().state || {};
  return (
    <Container maxW="container.lg" p="18px">
      <PageHeader title={title} />
      <ReactPlayer width="100%" url={link} />
    </Container>
  );
}
