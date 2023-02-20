import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Chatcontext } from "../Components/Context/ContextProvider";
import Sidebardrawer from "../Components/Chatcomponent/Sidebardrawer";
import Mychat from "../Components/Chatcomponent/Mychat";
import Chatbox from "../Components/Chatcomponent/Chatbox";
import { Container, Box } from "@chakra-ui/react";
const url = "http://localhost:5000";

function Chatpages() {
  const { users } = useContext(Chatcontext);
  return (
    <>
      <div width="100%">
        {users && <Sidebardrawer />}
        <Box d="flex" justifyContent="space-between" height="91.5vh" p="10px">
          {users && (
            <>
              <Mychat />
              <Chatbox />
            </>
          )}
        </Box>
      </div>
    </>
  );
}

export default Chatpages;
