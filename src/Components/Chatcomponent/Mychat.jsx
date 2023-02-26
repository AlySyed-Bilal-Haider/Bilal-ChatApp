import axios from "axios";
import React, { useState } from "react";
import { useToast } from "@chakra-ui/react";
import Chatloading from "../ChatLoading/Chatloading";
import { Chatcontext } from "../Context/ContextProvider";
function Mychat() {
  const { users, setUsers, setSelect, setSelectedChat, chats, setChatstate } =
    React.useContext(Chatcontext);
  const toast = useToast();
  const [loading, setloading] = useState(false);
  const url = "http://localhost:5000";
  const fetchchat = async (_id) => {
    try {
      setloading(true);
      const { data } = await axios.get(`${url}/api/accessChat`);
      setChatstate(data);
      setloading(false);
    } catch (error) {
      setloading(false);
      toast({
        title: "Error fatching the chat",
        description: error.message,
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
    }
  };
  return (
    <div>
      <h1>Chat app</h1>
    </div>
  );
}

export default Mychat;
