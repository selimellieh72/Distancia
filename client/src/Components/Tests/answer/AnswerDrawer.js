import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Center,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react";
import { ReactComponent as MenuSvg } from "../../../assets/svg/menu.svg";

export default function AnswerDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <MenuSvg onClick={onOpen} className="menu-icon" />
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>
              <Center fontWeight="bold" fontSize="2rem">
                Choose a student
              </Center>
            </DrawerHeader>

            <DrawerBody>
              <UnorderedList spacing="1rem">
                <ListItem>student student</ListItem>
                <hr/>
                <ListItem>student student</ListItem>
                <hr/>
                <ListItem>student student</ListItem>
                <hr/>
                <ListItem>student student</ListItem>
                <hr/>

              </UnorderedList>
            </DrawerBody>

            <DrawerFooter></DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
}
