import React, { useContext } from "react";
import { useMediaPredicate } from "react-media-hook";
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
  Avatar,
  Flex,
  AvatarBadge,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@chakra-ui/react";

import Logout from "../auth/Logout";
import { authContext } from "../../providers/AuthContext";
import { Link } from "react-router-dom";

const UserPopover = () => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const { fullName, isTeacher, discipline } = useContext(authContext)[0];

  const biggerThan400 = useMediaPredicate("(min-width: 400px)");

  return (
    <div className="header-profile">
      <Box className="header-profile__name" d="inline-block" color="white">
        {fullName}
      </Box>
      {biggerThan400 ? (
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
          <PopoverContent className="popover-content" mt={5} p={3}>
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
      ) : (
        <>
          <Avatar
            onClick={onOpen}
            className="header-profile__avatar"
            ml="1rem"
            cursor="pointer"
          />
          <Drawer
            isOpen={isOpen}
            placement="right"
            onClose={onClose}
            size="full"
          >
            <DrawerOverlay>
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader
                  textAlign="center"
                  fontSize="2rem"
                  fontWeight="bold"
                >
                  Your profile
                </DrawerHeader>

                <DrawerBody mt="2.5rem" textAlign="Center">
                  
                    <Avatar size="2xl">
                      {" "}
                      <AvatarBadge boxSize="1.25em" bg="green.500" />
                    </Avatar>
                    <div className="user-info">
                      <p className="user-info__fullname">{fullName}</p>
                      {isTeacher && (
                        <p className="user-info__discipline">
                          Teaching {discipline}
                        </p>
                      )}
                    </div>
                    <Logout />
                  
                </DrawerBody>
              </DrawerContent>
            </DrawerOverlay>
          </Drawer>
        </>
      )}
    </div>
  );
};
export default UserPopover;
