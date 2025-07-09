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
  img:{
    type: String,
    
  },

  address: {
    type: String,

  },
   role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,


}, {
  timestamps: true
});

const User = mongoose.model("User", UserSchema);

export default User;