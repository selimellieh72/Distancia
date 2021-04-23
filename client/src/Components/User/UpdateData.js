import React, { useContext, useEffect } from "react";
import { authContext } from "../../providers/AuthContext";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
  Avatar,
  Center,
  useToast,
} from "@chakra-ui/react";
import UploadImage from "../Core/UploadImage";
export default function UpdateData(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleSubmit, register, setValue, watch, reset } = useForm({
    // defaultValues: { firstName, lastName },
  });
  const [{ fullName, profile }, setAuthData] = useContext(authContext);

  const [firstName, lastName] = fullName.split(" ");
  const initialRef = React.useRef();
  const finalRef = React.useRef();

  const toast = useToast();

  useEffect(() => register("profile"), [register]);

  useEffect(() => {
    setTimeout(() => {
      setValue("firstName", firstName);
      setValue("lastName", lastName);
    });
  }, [setValue, isOpen, firstName, lastName]);

  const onChange = (data) => console.log(data);

  const onSubmit = (data) => {
    console.log(data);
    const fullName = data.firstName + " " + data.lastName;
    const updateUser = (body) =>
      axios.patch("/users", body).then((res) => {
        setAuthData({ ...res.data, isAuth: true });
        onClose();
        toast({
          description: "Successfully updated your user data",
          title: "Updated user data!",
          duration: 3000,
          status: "success",
        });
      });
    if (data.image) {
      const form = new FormData();
      form.append("files", data.image);
      axios
        .post("/uploads", form)
        .then((res) => updateUser({ fullName, profile: res.data.files[0].id }));
    } else {
      updateUser({ fullName });
    }
  };

  return (
    <>
      <p
        onClick={() => {
          onOpen();
          reset();
        }}
        className="edit-profile__btn"
      >
        Edit Profile
      </p>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form id="update-profile-form" onSubmit={handleSubmit(onSubmit)}>
              <FormControl isRequired>
                <Center>
                  <UploadImage
                    defaultImage={`${axios.defaults.baseURL}/uploads/${profile}`}
                    getImage={(image) => setValue("profile", image)}
                  />
                </Center>
                <FormLabel>First name</FormLabel>
                <Input
                  name="firstName"
                  ref={(ref) => {
                    register(ref);
                    initialRef.current = ref;
                  }}
                  placeholder="First name"
                />
              </FormControl>

              <FormControl mt={4} isRequired>
                <FormLabel>Last name</FormLabel>
                <Input name="lastName" ref={register} placeholder="Last name" />
              </FormControl>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button
              disabled={
                watch("firstName") === firstName &&
                watch("lastName") === lastName &&
                !watch("profile")
              }
              type="submit"
              form="update-profile-form"
              colorScheme="blue"
              mr={3}
            >
              Update
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
