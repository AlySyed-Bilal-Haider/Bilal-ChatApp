import React, { useEffect } from "react";
import { Container, Box } from "@chakra-ui/react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
} from "@chakra-ui/react";
import Signup from "../Components/Authentications/Signup";
import Login from "../Components/Authentications/Login";
import { useNavigate } from "react-router-dom";
function Homepage() {
  const navigate = useNavigate();
  useEffect(() => {
    const userInfo = localStorage.getItem("chatoken");
    if (userInfo) {
      navigate("/chatpages");
    }
  }, []);

  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        bg="white"
        w="100%"
        m="50px 0 15px 0"
        borderRadius={"lg"}
        borderWidth="1px"
      >
        <Text fontSize="4xl" color="black" textAlign="center" m="0.2em">
          Talk-A-Tive
        </Text>
      </Box>
      <Box bg="white" w="100%" p={4} borderRadius={"lg"} borderWidth="1px">
        <Tabs variant="soft-rounded">
          <TabList mb="1em">
            <Tab w="50%">Login</Tab>
            <Tab w="50%">Signup</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}

export default Homepage;
