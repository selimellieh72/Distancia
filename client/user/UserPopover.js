import React, { useContext } from "react";

import FocusLock from "react-focus-lock";
import {
  Text,
  Center,
  useDisclosure,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  Box,
  IconButton,
  Avatar,
  Flex,
  AvatarBadge,
} from "@chakra-ui/react";

import Logout from "../auth/Logout";
import { authContext } from "../../providers/AuthContext";
import { InfoIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

const UserPopover = () => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const { fullName, isTeacher, discipline } = useContext(authContext)[0];

  return (
    <div className="header-profile">
      <Box className="header-profile__name" d="inline-block" color="white">
        {fullName}
      </Box>
      <Popover
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        placement="right"
        closeOnBlur={false}
      >
        <PopoverTrigger>
          <Avatar
            className="header-profile__avatar"
            ml="1rem"
            cursor="pointer"
          />
        </PopoverTrigger>
        <PopoverContent mt={5} p={3}>
          <FocusLock returnFocus persistentFocus={false}>
            <PopoverArrow />
            <PopoverCloseButton />
            <Flex mb="18px">
              <Avatar mr={5}>
                <AvatarBadge boxSize="1.25em" bg="green.500" />
              </Avatar>
              <Flex flexDir="column">
                <Link to="/stats">
                  {" "}
                  <Text flex={1}>{fullName}</Text>
                </Link>
                <Text as="strong">
                  {isTeacher ? `Teacher (${discipline})` : "Student"}
                </Text>
              </Flex>
            </Flex>

            <Center>
              <Logout />
            </Center>
          </FocusLock>
        </PopoverContent>
      </Popover>
    </div>
  );
};
export default UserPopover;
