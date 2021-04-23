import React from "react";
import { Flex, Heading, Button, Box, Divider } from "@chakra-ui/react";
import BackIcon from "./BackIcon";
import { ReactComponent as GridSvg } from "../../assets/svg/grid.svg";
import LeftDrawer from "./LeftDrawer";

export default function 
PageHeader(props) {
  return (
    <>
      <Flex alignItems="center" minW="300px" justifyContent="space-between">
        <div className="page-header__left">
          {" "}
          <BackIcon pathName={props.pathName || "/grades"} />
          <span className="page-title">{props.title}</span>
        </div>
        <div className="page-header__icon">
          {props.deleteButton}
          {props.addButton}
          {props.homeworkDrawer}
          <LeftDrawer />
          
        </div>
      </Flex>
      <Box my="18px">
        <Divider borderColor="black" opacity="0.2" variant="solid" />
      </Box>
    </>
  );
}
