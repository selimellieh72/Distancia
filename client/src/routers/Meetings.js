import React from "react";
import Header from "../Components/header/Header";
import { Container, Flex, Heading, Button, Box, Divider } from "@chakra-ui/react";
import BackIcon from "../Components/Core/BackIcon";
import { ReactComponent as GridSvg } from "../assets/svg/grid.svg";
import MeetingList from "../Components/meetings/MeetingsList";

export default function Meetings() {
  return (
    <>
      <Header />
      <Container maxW="container.lg" p="18px">
        <Flex alignItems="center" minW="300px" justifyContent="space-between">
          <Heading as="h1">
            {" "}
            <BackIcon pathName="/grades" />
            <span className="page-title">Meetings</span>
          </Heading>
          <div className="page-header__icon">
            <Button>
              <GridSvg className="page-header__icon__grid" />
            </Button>
          </div>
        </Flex>
        <Box my="18px">
          <Divider borderColor="black" opacity="0.2" variant="solid" />
        </Box>
        <MeetingList />
      </Container>
    </>
  );
}
