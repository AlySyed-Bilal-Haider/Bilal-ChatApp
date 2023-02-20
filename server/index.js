import express from "express";
import connectDB from "./Config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./Routes/routes.js";
import { notfound, errorHandle } from "./Middleware/Errormiddleware.js";
const port = process.env.PORT || 5000;
const app = express();
app.use(cors("*"));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "50mb" }));
dotenv.config();
const URL =
  "mongodb+srv://bilalshah:151214bscs@cluster0.wknasdm.mongodb.net/?retryWrites=true&w=majority";
connectDB(URL);
app.use("/", routes);
app.use(notfound);
app.use(errorHandle);
app.listen(port, (req, res) => {
  console.log("Run API successfully", port);
});
