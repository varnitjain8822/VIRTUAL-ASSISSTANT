import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import gentoken from "../config/token.js";

export const signup = async (req, res) => {    
  try { 
    const { name, email, password } = req.body;

    const exitsemail = await User.findOne({ email });
    if (exitsemail) {
      return res.status(400).json({ message: "email already exists" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "password must be at least 6 characters" });
    }

    const hashedpassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedpassword });

    const token = await gentoken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
      secure: false
    });

    const { password: pw, ...userData } = user._doc;
    return res.status(201).json(userData);
  } catch (error) {
    return res.status(500).json({ message: `sign up error ${error}` });
  }
};

export const login = async (req, res) => {    
  try { 
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }

    const ismatch = await bcrypt.compare(password, user.password);
    if (!ismatch) {
      return res.status(400).json({ message: "incorrect password" });
    }

    const token = await gentoken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
      secure: false
    });

    const { password: pw, ...userData } = user._doc;
    return res.status(200).json(userData);
  } catch (error) {
    return res.status(500).json({ message: `login error ${error}` });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "logout successful" });
  } catch (error) {
    return res.status(500).json({ message: `logout error ${error}` });
  }
};
