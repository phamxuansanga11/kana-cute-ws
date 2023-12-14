import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: String,
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "User",
  },
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
