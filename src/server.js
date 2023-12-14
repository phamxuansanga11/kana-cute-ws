import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import userRouter from "./routers/user.js";
import mongoose from "mongoose";
dotenv.config();

const MONGODB_CONNECT_URL = process.env.MONGO_DB;
const PORT = process.env.PORT || 5009;

mongoose
  .connect(MONGODB_CONNECT_URL)
  .then((res) => console.log(`Mongo DB connect successfully...!`))
  .catch((err) => console.log("Some error when connect to Mongo DB", err));

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ limit: "50mb" }));

//router
app.use("/auth", userRouter);

app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
});
