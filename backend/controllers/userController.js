const asyncHandler = require("express-async-handler");

// @desc Register new user
// @route POST /api/users
// @acess Public
const registerUser = asyncHandler(async (req, res) => {
  res.json({ message: "register user" });
});

// @desc Authenticate a user
// @route POST /api/users/login
// @acess Public
const loginUser = asyncHandler(async (req, res) => {
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
