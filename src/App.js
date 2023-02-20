import Homepage from "./Pages/Homepage";
import Chatpages from "./Pages/Chatpages";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { useEffect } from "react";
function App() {
  const url = "http://localhost:5000";
  const token = localStorage.getItem("chatoken");
  const tokenVerify = async () => {
    try {
      await fetch(`${url}/tokenverfiy`, {
        method: "GET",
        headers: {
          "x-access-token": token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("token verfiy", data);
        });
    } catch (error) {
      console.log("token verify error", error);
    }
  };
  useEffect(() => {
    token && tokenVerify();
    console.log("token here:", token);
  }, [token]);

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/chatpages" element={<Chatpages />} />
      </Routes>
    </div>
  );
}

export default App;
