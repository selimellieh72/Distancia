import React, { useState, useRef } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { ReactComponent as RemoveSvg } from "../../assets/svg/remove.svg";

export default function LessDialog(props) {
  const cancelRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <RemoveSvg onClick={onOpen} className="remove option" />

      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Action Impossible</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            You cannot create a multiple choice or single choice question with
            less then 2 options.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button colorScheme="red" ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
