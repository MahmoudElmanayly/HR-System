import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobile: String,
  group: {
    type: String,
    required: true,
    uppercase: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  attendance: {
    type: String,
    default: "",
  },
});

const UserModel = mongoose.model("User", userSchema);

export const getUsers = () => UserModel.find();

export const getUserByEmail = (_email: string) =>
  UserModel.findOne({ email: _email });

export const getUserById = (id: string) => UserModel.findById(id);

export const createUser = (values: Record<string, any>) =>
  new UserModel(values).save().then((user) => user.toObject());

export const deleteUserById = (id: string) =>
  UserModel.findOneAndDelete({ _id: id });

export const updateUserById = (id: string, values: Record<string, any>) =>
  UserModel.findByIdAndUpdate(id, values);

export default UserModel;
