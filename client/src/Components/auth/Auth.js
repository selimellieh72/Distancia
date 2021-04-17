import React, { useContext, useState } from "react";
import Header from "../header/Header";

import { useForm } from "react-hook-form";
import { useHistory, Link } from "react-router-dom";
import { authContext } from "../../providers/AuthContext";

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
} from "@chakra-ui/react";

export default function Auth(props) {
  const { register, handleSubmit, errors, watch, setError } = useForm();
  let [isTeacher, setIsTeacher] = useState(false);

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
        password: data.password,
        isTeacher: data.isTeacher,
        discipline: data.discipline,
        fullName: data.fullName,
      });
    if (isSignup) {
      const body = {
        fullName: data.firstName + " " + data.lastName,
        username: data.emailAddress,
        password: data.password,
        isTeacher: isTeacher,
        discipline: data.discipline,
      };
      axios
        .post("/register", body)

        .then((res) => {
          updateAuthInfo(res);

          history.push("/grades");
        })
        .catch((e) => {
          console.log(errors.emailAddress);
          setError("emailAddress", {
            type: "server",
            message:
              "This email already exists. Please login or use another email.",
          });
        });
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
            <FormControl isRequired>
              <Flex>
                <Box mr="16px">
                  <FormLabel>First name:</FormLabel>
                  <Input
                    id="firstName"
                    name="firstName"
                    ref={register}
                    type="text"
                    placeholder="First Name"
                  />
                </Box>
                <Box>
                  <FormLabel>Last name:</FormLabel>
                  <Input
                    id="lastName"
                    name="lastName"
                    ref={register}
                    type="text"
                    placeholder="Last Name"
                  />
                </Box>
              </Flex>

              <FormHelperText>
                Your name will be displayed to other users.
              </FormHelperText>
            </FormControl>
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
              <Link className="auth-button__joining__type" to="/register">
                Don't have an account? Create one!
              </Link>
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
              {isSignup ? "Register" : "Log in"}
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
}
