const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

// @desc Register new user
// @route POST /api/users
// @acess Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  console.log(name, email, password);
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // Check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user)
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
    });
  else {
    res.status(400);
    throw new Error("Invalid user data");
  }
  res.json({ name, email, password });
});

// @desc Authenticate a user
// @route POST /api/users/login
// @acess Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error("User doesn't exists");
  }

  if (user && (await bcrypt.compare(password, user.password)))
    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
    });
  else {
    res.status(400);
    throw new Error("Invalid user credentials");
  }
  res.json({ message: "login user" });
});

// @desc Get user data
// @route GET /api/users/me
// @acess Public
const getMe = asyncHandler(async (req, res) => {
  res.json({ message: "user data" });
});
module.exports = {
  registerUser,
  loginUser,
  getMe,
};
