import { MongoClient } from "mongodb";
import mongoose, { mongo } from "mongoose";

const connectMongoDb = async () => {
  const URI = process.env.MONGODB_URL;

  if (!URI) throw new Error("please add your monog uri to env");

  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(URI);
    console.log("connected");
  } catch (error) {
    console.error("error");
    process.exit(1);
  }
};

export default connectMongoDb;
