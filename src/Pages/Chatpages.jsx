import axios from "axios";
import React, { useState, useEffect } from "react";
const url = "http://localhost:5000";
function Chatpages() {
  const [chatsdata, setChatstate] = useState([]);
  const fetchChats = async () => {
    try {
      const { data } = await axios.get(`${url}/chat/api`);
      console.log("data of user:", data);
    } catch (error) {
      console.log("fetch chats app", error);
    }
  };
  useEffect(() => {
    fetchChats();
  }, []);

  return <div>Chatpages</div>;
}

export default Chatpages;
