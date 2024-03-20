const express = require("express");
const router = express.Router();

const {
  loginAdmin,
  adminProfile,
  getUsers,
  editUser,
  userBlock,
  searchUser,
  registerUser,
} = require("../controllers/adminController");

const { protectAdmin } = require("../middleware/authMiddleware");

router.get("/", protectAdmin, getUsers);
router.post("/search", protectAdmin, searchUser);
router.post("/login", loginAdmin);
router.get("/profile", protectAdmin, adminProfile);
router.post("/block", protectAdmin, userBlock);
router.post("/adduser", protectAdmin, registerUser);
router.put("/:userId", protectAdmin, editUser);

module.exports = router;
