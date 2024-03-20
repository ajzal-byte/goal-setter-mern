const express = require("express");
const {
  registerUser,
  loginUser,
  getMe,
  editUser,
  profileUpload
} = require("../controllers/userController");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);
router.put("/:userId", protect, editUser);
router.post("/profile/upload", protect, profileUpload);

module.exports = router;
