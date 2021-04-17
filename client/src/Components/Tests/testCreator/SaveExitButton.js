import React from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";

export default function SaveExitButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        display="block"
        onClick={onOpen}
        mt="1rem"
        className="save-exit-button"
        colorScheme="green"
      >
        Save {"&"} exit
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Save and Exit</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            While saving and exiting your job will be saved and you can continue
            it later to publish it to your students.
          </ModalBody>

          <ModalFooter>
            <Link to="/tests">
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Proceed
              </Button>
            </Link>
            <Button variant="ghost">Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
