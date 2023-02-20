import React, { useState } from "react";
import {
  Text,
  Button,
  Tooltip,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
  ModalBody,
  Input,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Box,
  Toast,
  useToast,
} from "@chakra-ui/react";
import Chatloading from "../ChatLoading/Chatloading";
import ProfileModal from "../ProfileModal/ProfileModal";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import Searchuser from "../Searchusers/Searchuser";
import axios from "axios";
const url = "http://localhost:5000";
function Sidebardrawer() {
  const [loading, setloading] = useState(false);
  const [result, setResultstate] = useState([]);
  const toast = useToast();
  const [search, setSearchstate] = useState("");
  const navgiate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const getValue = localStorage.getItem("chatoken");
  const onLogoutHandle = () => {
    if (getValue) {
      localStorage.removeItem("chatoken");
      navgiate("/");
    }
  };
  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please type user name",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return false;
    }
    setloading(true);
    try {
      const { data } = await axios.get(`${url}/search?search=${search}`);
      console.log("Data here:", data);
      setResultstate(data?.data);
      setloading(false);
    } catch (error) {
      setloading(false);
      console.log("search error", error);
    }
  };

  const chataccess = async (users) => {
    try {
      setloading(true);
      const { data } = await axios.post(`${url}/api/accessChat`, {
        userId: users,
      });
      console.log(data, "chat access");
      setloading(false);
      onClose();
    } catch (error) {
      console.log("chat access error", error);
      setloading(false);
    }
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          backgroundColor: "white",
          padding: "5px 10px",
        }}
      >
        <Tooltip
          label="Search users to Chat"
          hasArrow
          placement="bottom-end"
          fontSize="md"
        >
          <Button variant="ghost" onClick={onOpen}>
            <Text px={4} d={{ base: "none", md: "flex" }}>
              Search users
            </Text>
          </Button>
        </Tooltip>
        <Text fontSize="2xl">Chat APP</Text>
        <div>
          <Menu p={1}>
            <MenuButton>
              <BellIcon />
            </MenuButton>
          </Menu>
          <Menu isLazy>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              Profile
            </MenuButton>
            <MenuList>
              <MenuGroup>
                <ProfileModal>
                  <MenuItem>Profile</MenuItem>
                </ProfileModal>
                {getValue && (
                  <MenuItem onClick={onLogoutHandle}>Logout </MenuItem>
                )}
              </MenuGroup>
            </MenuList>
            <MenuDivider />
          </Menu>
        </div>
      </div>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="2px">Search Users</DrawerHeader>
          <DrawerBody>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                paddingBottom: "10px",
                marginTop: "10px",
              }}
            >
              <Input
                placeholder="Searh by name or email"
                mr={2}
                value={search}
                onChange={(e) => {
                  setSearchstate(e.target.value);
                }}
              />
              <Button onClick={handleSearch}>Go</Button>
            </div>
            {loading ? (
              <Chatloading />
            ) : (
              <>
                {result &&
                  result?.map((users) => {
                    return (
                      <Searchuser
                        users={users?.name}
                        key={users._id}
                        handlefunction={() => {
                          chataccess(users._id);
                        }}
                      />
                    );
                  })}
              </>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default Sidebardrawer;
