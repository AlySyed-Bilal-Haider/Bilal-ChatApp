import express from "express";
import { chats } from "./Data/Data.js";
import dotenv from "dotenv";
import cors from "cors";
const app = express();
app.use(cors("*"));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "50mb" }));
dotenv.config();
app.get("/chat/api", async (req, res) => {
  try {
    console.log(chats);
    res.send(chats);
  } catch (error) {
    console.log("chat api:", error);
  }
});
app.get("/chat/api/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id, "id");
    const singlechat = chats.find((element) => {
      return element?._id == id;
    });
    console.log("singlechat:", singlechat);
    res.send(singlechat);
  } catch (error) {
    console.log("chat api:", error);
  }
});
const port = process.env.PORT || 5000;
console.log("port:", port);
app.listen(port, (req, res) => {
  console.log("Run API successfully", port);
});
