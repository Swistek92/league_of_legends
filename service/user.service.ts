import { UserDocument } from "./../models/user.model";
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
  addStared: async(name: string)=>{
    
  }
};

export default UserService;
