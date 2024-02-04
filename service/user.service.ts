import { UserDocument } from "./../types/UserInterface";

import UserModel from "../models/user.model";
import { FilterQuery } from "mongoose";

const UserService = {
  addUser: async (user: UserDocument) => {
    return UserModel.create(user);
  },
  findUser: async (query: FilterQuery<UserDocument>) => {
    return UserModel.findOne(query);
  },
  getAllUsers: async () => {
    return UserModel.find();
  },

  updateStared: async (email: string, staredChampions: string[]) => {
    return UserModel.findOneAndUpdate(
      { email: email },
      { $set: { stared: staredChampions } },
      { new: true }
    );
  },
};

export default UserService;
