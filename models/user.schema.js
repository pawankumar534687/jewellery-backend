import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    pattern: {
      value: /^[6-9]\d{9}$/,
      message: "Invalid phone number",
    }
  },

  address: {
    type: String,

  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,


});

const User = mongoose.model("User", UserSchema);

export default User;