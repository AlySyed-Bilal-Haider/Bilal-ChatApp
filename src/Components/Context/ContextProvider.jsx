import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export const Chatcontext = createContext();
const ChatProvider = ({ children }) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState("");
  const [setSelect, setSelectedChat] = useState("");
  const [chats, setChatstate] = useState("");
  useEffect(() => {
    const userInfo = localStorage.getItem("chatoken");
    if (!users && !userInfo) {
      navigate("/");
    } else {
      if (users) {
        setUsers(users);
      } else {
        setUsers(userInfo);
      }
    }
  }, []);
  console.log("user token:", users);
  return (
    <Chatcontext.Provider
      value={{
        users,
        setUsers,
        setSelect,
        setSelectedChat,
        chats,
        setChatstate,
      }}
    >
      {children}
    </Chatcontext.Provider>
  );
};

export default ChatProvider;
