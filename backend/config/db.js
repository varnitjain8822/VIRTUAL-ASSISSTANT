import mongoose from "mongoose";

const url = "mongodb+srv://root:root@virtual-assisstant.pecfcu5.mongodb.net/";

const connectdb = async () => {
  try {
    await mongoose.connect(url);
    console.log("DB connected");
  } catch (error) {
    console.log("DB connection error:", error);
    throw error; }
};

export default connectdb;
