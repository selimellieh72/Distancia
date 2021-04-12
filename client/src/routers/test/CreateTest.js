import {
  Button,
  Input,
  Center,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import Header from "../../Components/header/Header";
import AddTestButton from "../../Components/Tests/testCreator/AddTestButton";
import TestTextSection, {
  TestMultipleSection,
} from "../../Components/Tests/testCreator/TestSection";

export default function CreateTest() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { cancelIsOpen, cancelOnOpen, cancelOnClose } = useDisclosure();
  return (
    <>
      <Header />
      <div className="test-creator">
        <div className="test-creator__heading">
          <Input
            size="lg"
            className="test-input__title"
            placeholder="Title"
            variant="none"
            fontWeight="bold"
            fontSize="1.5rem"
            textAlign="center"
          />
          <hr className="test-creator__heading__divider" />
        </div>
        <Center display="block">
          <TestTextSection />
          <TestMultipleSection />
        </Center>
        <Center>
          <AddTestButton />
        </Center>
        <Flex mt="1.5rem" justifyContent="space-around">
          <Button mt="1rem" className="cancel-button" colorScheme="red">
            Cancel
          </Button>
          <Button
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
                While saving and exiting your job will be saved and you can
                continue it later to publish it to your students.
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
          <Modal isOpen={cancelIsOpen} onClose={cancelOnClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Save and Exit</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                While saving and exiting your job will be saved and you can
                continue it later to publish it to your students.
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
          <Button mt="1rem" className="publish-button" colorScheme="blue">
            Publish
          </Button>
        </Flex>
      </div>
    </>
  );
}
