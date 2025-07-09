import User from "../models/user.schema.js";
import ExpressError from "../utils/ExpressError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const signup = async (req, res, next) => {
  const { firstname, lastname, email, password, role } = req.body;

  if (!firstname || !lastname || !email || !password) {
    return next(new ExpressError(404, "All fields are required"));
  }

  if (role && role === "admin") {
    return next(new ExpressError(403, "Signup as admin not allowed here"));
  }

  const exist = await User.findOne({ email });
  if (exist) {
    return next(new ExpressError(400, "User already exists"));
  }

  const saltPassword = await bcrypt.hash(password, 10);

  const user = new User({
    firstname,
    lastname,
    email,
    password: saltPassword,
    role: "user",
  });

  await user.save();

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.status(200).json({
    message: "Signup successful",
    token,
    user: {
      id: user._id,
      role: user.role,
    },
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ExpressError(404, "All fields are required"));
  }

  const user = await User.findOne({ email });
  if (!user) {
    return next(new ExpressError(404, "User not found"));
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return next(new ExpressError(401, "Invalid credentials"));
  }

  if (user.role !== "user") {
    return next(new ExpressError(403, "Only users can login here"));
  }

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.status(200).json({
    message: "Login successful",
    token,
    user: {
      id: user._id,
      role: user.role,
    },
  });
};

const adminLogin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ExpressError(404, "All fields are required"));
  }

  const user = await User.findOne({ email });
  if (!user || user.role !== "admin") {
    return next(new ExpressError(403, "Only admins can login here"));
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return next(new ExpressError(401, "Invalid credentials"));
  }

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.status(200).json({
    message: "Admin login successful",
    token,
    user: {
      id: user._id,
      role: user.role,
    },
  });
};

const getusers = async (req, res) => {
  const user = await User.find();
  res.send(user);
};

export { signup, login, getusers, adminLogin };
