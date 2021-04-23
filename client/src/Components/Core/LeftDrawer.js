import React from "react";
import { Link } from "react-router-dom";
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
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";

export default function LeftDrawer(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div>
      <Button
      bg="none"
        className="page-header__icon__button"
        boxShadow="none"
        outlineColor="white"
        onClick={onOpen}
      >
        <GridSvg className="page-header__icon__grid" />
      </Button>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{props.chapterTitle}</DrawerHeader>
          <DrawerBody>
            <UnorderedList mb="1rem" minWidth="min-content" spacing={1.5}>
              <ListItem className="grade-content__type">
                <Link
                  to={`/grades/${props.gradeId}/chapter/${props.chapterId}/lectures`}
                >
                  Lecture
                </Link>
              </ListItem>

              <ListItem className="grade-content__type">
                <Link
                  to={`/grades/${props.gradeId}/chapter/${props.chapterId}/homeworks`}
                >
                  Homeworks
                </Link>
              </ListItem>
              <ListItem className="grade-content__type">
                <Link>Tests</Link>
              </ListItem>
            </UnorderedList>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
