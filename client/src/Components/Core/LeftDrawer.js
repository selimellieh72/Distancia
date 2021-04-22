import React from "react";
import { ReactComponent as GridSvg } from "../../assets/svg/grid.svg";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

export default function LeftDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div>
      <Button onClick={onOpen}>
        <GridSvg className="page-header__icon__grid" />
      </Button>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay/>
          <DrawerContent>
              <DrawerCloseButton/>
              <DrawerHeader>Chpater Name</DrawerHeader>
              <DrawerBody>

              </DrawerBody>
          </DrawerContent>
      </Drawer>
    </div>
  );
}
