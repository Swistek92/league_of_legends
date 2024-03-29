import mongoose, { Schema, model, Document } from "mongoose";
import { UserDocument } from "../types";

const userSchema = new Schema<UserDocument>({
  name: { type: String, required: [true, "please add your name"] },
  email: { type: String, required: [true, "please add your email"] },
  image: { type: String, required: false },
  stared: { type: [String], required: false },
});

// mongoose.models = {};
export const UserModel =
  mongoose.models.User || mongoose.model("User", userSchema);

export default UserModel;
