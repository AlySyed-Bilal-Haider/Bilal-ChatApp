import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export const Chatcontext = createContext();
const ChatProvider = ({ children }) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState("");
  const [setSelect, setSelectedstate] = useState("");
  const [chats, setChatstate] = useState("");
  useEffect(() => {
    const userInfo = localStorage.getItem("chatoken");
    console.log("userInfo:", userInfo);
    if (!users) {
      navigate("/");
    }
  }, []);
  console.log("user token:", users);
  return (
    <Chatcontext.Provider
      value={{
        users,
        setUsers,
        setSelect,
        setSelectedstate,
        chats,
        setChatstate,
      }}
    >
      {children}
    </Chatcontext.Provider>
  );
};

export default ChatProvider;
