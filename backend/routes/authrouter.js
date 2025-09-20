import express from "express"
import { login, logout, signup } from "../controllers/auth.controller.js"
const authrouter = express.Router()

authrouter.post("/signup",signup)
authrouter.get("/", (req, res) => {
  res.render("virtual assistant in making");
});

authrouter.post("/login",login)
authrouter.get("/logout",logout)

export default authrouter