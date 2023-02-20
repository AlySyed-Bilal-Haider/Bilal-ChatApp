import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Chatcontext } from "../Context/ContextProvider";
function Login() {
  const { setUsers } = React.useContext(Chatcontext);
  const toast = useToast();
  const navigate = useNavigate();
  const url = "http://localhost:5000";
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const [userstate, setUserstate] = useState({
    email: "",
    password: "",
  });
  const onchangeHandler = (e) => {
    setUserstate({ ...userstate, [e.target.name]: e.target.value });
  };
  //////show message of success or error/////////
  const toastHandler = (msg, head) => {
    toast({
      title: `${head}`,
      description: `${msg}`,
      status: "error",
      duration: 2000,
      isClosable: true,
      position: "top",
    });
  };
  const loginHandles = async (e) => {
    e.preventDefault();
    try {
      if (!userstate.email || !userstate.password) {
        toastHandler("Please fill fields", "Fill form");
      } else {
        const { data } = await axios.post(`${url}/loginuser`, userstate);
        if (data.status === "ok") {
          localStorage.setItem("chatoken", data.token);
          toastHandler(data.message, "login");
          setUsers(data.token);
          navigate("/chatpages");
        }
        data?.status === "error" &&
          toastHandler(data?.message, "Email and Password");
        setUserstate({
          email: "",
          password: "",
        });
      }
    } catch (error) {
      toastHandler("Resquest failed");
      console.log("user register error:", error);
    }
  };
  return (
    <VStack>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter your email"
          value={userstate.email || ""}
          name="email"
          onChange={onchangeHandler}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter password !"
            value={userstate.password || ""}
            onChange={onchangeHandler}
            name="password"
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        variant="solid"
        width="100%"
        colorScheme="blue"
        onClick={loginHandles}
      >
        login
      </Button>
      <Button variant="solid" width="100%" colorScheme="red">
        Get Guest user Credentials
      </Button>
    </VStack>
  );
}

export default Login;
