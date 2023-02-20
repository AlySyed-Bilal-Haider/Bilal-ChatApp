import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";

function Signup() {
  const toast = useToast();
  const [loading, setloading] = useState(false);
  const [show, setShow] = React.useState(false);
  const [file, setFilesstate] = useState();
  const handleClick = () => setShow(!show);
  const url = "http://localhost:5000";
  const [userstate, setUserstate] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
    pic: "",
  });

  ////////onchange handler , get user values///////////
  const onchangeHandler = (e) => {
    setUserstate({ ...userstate, [e.target.name]: e.target.value });
  };

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

  const registerationsHandles = async () => {
    // if (file === undefined) {
    //   toastHandler("please select image", "add profile pic");
    //   return false;
    // }
    // if (file.type == "image/jpeg" || file.type == "image/png") {
    //   console.log("add user");
    //   const userdata = new FormData();
    //   userdata.append("file", file);
    //   userdata.append("upload_preset", "chatapp");
    //   userdata.append("cloud_name", "dw56wv7fx");
    //   setloading(true);
    //   await fetch("https://res.cloudinary.com/dw56wv7fx/image/upload", {
    //     method: "post",
    //     body: userdata,
    //   })
    //     .then((res) => res.json())
    //     .then((data) => {
    //       console.log("image data", data);
    //       setloading(false);
    //     })
    //     .catch((error) => {
    //       console.log("image error", error);
    //       setloading(false);
    //     });
    // } else {
    //   toastHandler("only select image png/jpeg", "File type Invalid");
    //   return false;
    // }
    if (
      !userstate.name ||
      !userstate.email ||
      !userstate.password ||
      !userstate.confirmpassword
    ) {
      toastHandler("please add all fields", "Please try again");
      return false;
    } else if (userstate.password !== userstate.confirmpassword) {
      toastHandler("Password not match", "Please try again");
      return false;
    }
    try {
      const { data } = await axios.post(`${url}/registerUser`, userstate);
      if (data.status === "ok") {
        toastHandler("user add successfully", "add user");
        setUserstate({
          name: "",
          email: "",
          password: "",
          confirmpassword: "",
          pic: "",
        });
      }

      data.status === "error" && toastHandler(data?.message);
    } catch (error) {
      console.log("user register error:", error);
    }
  };

  return (
    <VStack>
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter your name"
          name="name"
          onChange={onchangeHandler}
          value={userstate.name}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter your email"
          name="email"
          value={userstate.email || ""}
          onChange={onchangeHandler}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show === true ? "text" : "password"}
            placeholder="Enter password !"
            value={userstate.password || ""}
            name="password"
            onChange={onchangeHandler}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="confirm-password" isRequired>
        <FormLabel>Confirm password</FormLabel>
        <InputGroup>
          <Input
            type={show == true ? "text" : "password"}
            placeholder="Enter confirm password !"
            value={userstate.confirmpassword || ""}
            onChange={onchangeHandler}
            name="confirmpassword"
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="pic" isRequired>
        <FormLabel>Picture</FormLabel>
        <Input
          onChange={(e) => {
            setFilesstate(e.target.files[0]);
          }}
          type="file"
          p={1.5}
          accept="image/*"
          placeholder="Enter your name"
        />
      </FormControl>
      <Button
        variant="solid"
        width="100%"
        colorScheme="whatsapp"
        onClick={(e) => {
          e.preventDefault();
          registerationsHandles();
        }}
        isLoading={loading}
      >
        Signup
      </Button>
    </VStack>
  );
}

export default Signup;
