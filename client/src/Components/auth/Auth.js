import React, { useContext, useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { useHistory, Link } from "react-router-dom";
import { authContext } from "../../providers/AuthContext";
import { ReactComponent as GoogleIcon } from "../../assets/svg/search.svg";

import axios from "axios";

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  FormHelperText,
  Button,
  Box,
  Select,
  Switch,
  Flex,
  Center,
  Avatar,
} from "@chakra-ui/react";
import UploadImage from "../Core/UploadImage";

export default function Auth(props) {
  const {
    register,
    handleSubmit,
    errors,
    watch,
    setError,
    setValue,
  } = useForm();
  let [isTeacher, setIsTeacher] = useState(false);

  useEffect(() => register("profile"), []);

  const history = useHistory();

  const [authInfo, setAuthInfo] = useContext(authContext);

  const isSignup = props.type === "signup";

  const disciplines = [
    "Physics",
    "Math",
    "English",
    "Biology",
    "Chemistry",
    "Sociology",
    "Economy",
    "French",
    "Arabic",
  ];

  function submitForm(data) {
    const updateAuthInfo = ({ data }) =>
      setAuthInfo({
        isAuth: true,
        username: data.emailAddress,
        ...data,
      });
    if (isSignup) {
      const register = (profile) =>
        axios
          .post("/register", {
            fullName: data.firstName + " " + data.lastName,
            username: data.emailAddress,
            password: data.password,
            isTeacher: isTeacher,
            discipline: data.discipline,
            profile,
          })

          .then((res) => {
            console.log("res");
            updateAuthInfo(res);

            history.push("/grades");
          })
          .catch((e) => {
            console.log("Here");
            setError("emailAddress", {
              type: "server",
              message:
                "This email already exists. Please login or use another email.",
            });
          });

      if (data.profile) {
        const formData = new FormData();
        formData.append("files", data.profile);
        axios.post("/upload", formData).then((res) => {
          console.log(res.data.files);
          register(res.data.files[0].id);
        });
      } else {
        register();
      }
    } else {
      axios
        .post("/login", {
          username: data.emailAddress,
          password: data.password,
        })
        .then((res) => {
          updateAuthInfo(res);
          history.push("/grades");
        })
        .catch((e) => {
          if (e.response) {
            if (e.response.status === 401) {
              setError("password", {
                type: "server",
                message:
                  "Authentication failed, wrong email/password combination",
              });
            }
          }
        });
    }
  }

  return (
    <div>
      <section id="auth">
        <form action="" onSubmit={handleSubmit(submitForm)}>
          {isSignup && (
            <>
              <FormControl
                isInvalid={errors.firstName || errors.lastName}
                isRequired
              >
                <Flex>
                  <Box mr="16px">
                    <FormLabel>First name:</FormLabel>
                    <Input
                      id="firstName"
                      name="firstName"
                      ref={register({
                        maxLength: {
                          value: 20,
                          message:
                            "Your first name can only be a maximum of 20 characters",
                        },
                      })}
                      type="text"
                      placeholder="First Name"
                    />
                  </Box>
                  <Box>
                    <FormLabel>Last name:</FormLabel>
                    <Input
                      id="lastName"
                      name="lastName"
                      ref={register({
                        maxLength: {
                          value: 20,
                          message:
                            "Your last name can only be a maximum of 20 characters",
                        },
                      })}
                      type="text"
                      placeholder="Last Name"
                    />
                  </Box>
                </Flex>

                <FormHelperText>
                  {!errors.firstName &&
                    "Your name will be displayed to other users."}
                </FormHelperText>
                <FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>
                <FormErrorMessage>{errors.lastName?.message}</FormErrorMessage>
              </FormControl>
              <h1 style={{ textAlign: "left" }}>Profile Picture:</h1>
              <UploadImage getImage={(image) => setValue("profile", image)} />
            </>
          )}

          <FormControl id="emails" isRequired isInvalid={errors.emailAddress}>
            <FormLabel mt="20px">Email address:</FormLabel>
            <Input
              name="emailAddress"
              ref={register}
              type="email"
              placeholder="Email"
            />

            <FormHelperText>
              {!errors.emailAddress && "We'll never share your email address."}
            </FormHelperText>
            <FormErrorMessage>
              {errors.emailAddress && errors.emailAddress.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl id="password" isInvalid={errors.password} isRequired>
            <FormLabel mt="20px">Password:</FormLabel>
            <Input
              name="password"
              ref={register({
                required: "Please enter a password",
                minLength: {
                  value: 6,
                  message: "Please enter a password of minimum 6 characters",
                },
              })}
              type="password"
              placeholder="Password"
              autoComplete="on"
            />
            <FormHelperText>
              {!errors.password && "We'll never share your password."}
            </FormHelperText>

            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>

          {isSignup && (
            <div>
              <FormControl
                id="confirmPassword"
                isRequired
                isInvalid={errors.confirmPassword}
                autoComplete="on"
              >
                <FormLabel mt="20px">Confirm Password:</FormLabel>
                <Input
                  name="confirmPassword"
                  ref={register({
                    validate: (val) =>
                      val === watch("password") || "Passwords does not match",
                  })}
                  type="password"
                  placeholder="re-enter Password"
                />
                <FormHelperText>
                  {!errors.confirmPassword && "Please reenter your password"}
                </FormHelperText>
                <FormErrorMessage>
                  {errors.confirmPassword && errors.confirmPassword.message}
                </FormErrorMessage>
              </FormControl>

              {isTeacher && (
                <FormControl isRequired>
                  <FormLabel mt="20px">Discipline:</FormLabel>
                  <Select
                    name="discipline"
                    placeholder="Select option"
                    ref={register}
                  >
                    {disciplines.map((discipline) => (
                      <option value={discipline}> {discipline}</option>
                    ))}
                  </Select>
                </FormControl>
              )}
              <FormControl
                display="flex"
                mt="6px"
                justifyContent="center"
                alignItems="flex-end"
              >
                <FormLabel m="0">Are you a teacher?</FormLabel>
                <Switch
                  onChange={({ target }) => setIsTeacher(target.checked)}
                  mt="1rem"
                  name="isTeacher"
                  value="true"
                  ref={register}
                />
              </FormControl>
            </div>
          )}
          <div className="auth-button">
            {!isSignup ? (
              <>
                <Center>
                  <Flex
                    width="max-content"
                    alignItems="center"
                    className="signin-with-google"
                  >
                    {" "}
                    <GoogleIcon className="google-icon" />{" "}
                    <span>Sign in with google</span>
                  </Flex>
                </Center>
                <Link className="auth-button__joining__type" to="/register">
                  Don't have an account? Create one!
                </Link>
              </>
            ) : (
              <Link className="auth-button__joining__type" to="/login">
                Already have an account? Sign In!
              </Link>
            )}

            <Button
              className="auth-button__joining"
              type="submit"
              mt="2rem"
              mx="auto"
              display="block"
              colorScheme="blue"
            >
              {isSignup ? "Register" : "Sign in"}
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
}
