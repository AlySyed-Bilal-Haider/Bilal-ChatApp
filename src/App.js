import Homepage from "./Pages/Homepage";
import Chatpages from "./Pages/Chatpages";
import { Route, Routes } from "react-router-dom";
import "./App.css";
function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/chatpages" element={<Chatpages />} />
      </Routes>
    </div>
  );
}

export default App;
