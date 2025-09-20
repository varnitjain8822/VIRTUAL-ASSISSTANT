import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  assistantName: {
    type: String,
    default: "Anupam Vani"
  },
  assistantImage: {
    type: String,
    default: ""
  },
  history: {
    type: [String],
    default: []
  }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User
