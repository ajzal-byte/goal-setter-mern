const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

// @desc Register new user
// @route POST /api/users
// @acess Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
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
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
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
    throw new Error("User doesn't exist");
  }

  if(user && user.isBlock === true){
    res.status(401);
    throw new Error("User is blocked");
  }

  if (user && (await bcrypt.compare(password, user.password)))
    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      profileUrl: user.profileUrl,
      token: generateToken(user._id),
    });
  else {
    res.status(400);
    throw new Error("Invalid user credentials");
  }
});

// @desc Get user data
// @route GET /api/users/me
// @acess Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

// @desc Edit user data
// @route PUT /api/users/:userId
// @acess Private
const editUser = asyncHandler(async (req, res) => {
  const userId = req.params.userId
  const { name, email } = req.body;
  const user = await User.findByIdAndUpdate(
    userId,
    { name, email },
    { new: true }
  );

  if (user) {
    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      profileUrl: user.profileUrl,
      token: req.token,
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

// Photo url upload
const profileUpload = asyncHandler(async (req, res) => {
  const url = req.body.url;

  const user = await User.findByIdAndUpdate(
    req.user.id,
    {
      profileUrl: url,
    },
    { new: true }
  );

  res.status(200).json(user)
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
  editUser,
  profileUpload
};
