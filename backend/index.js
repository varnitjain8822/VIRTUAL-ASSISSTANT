import express from "express";
import dotenv from "dotenv";
import connectdb from "./config/db.js";
import authrouter from "./routes/authrouter.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
const port = 5000;

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authrouter);


const startServer = async () => {
  try {
    await connectdb();
    app.listen(port, () => {
      console.log(`Server started at http://localhost:${port}`);
    });
  } catch (error) {
    console.log("Failed to start server", error);
  }
};

startServer();
