import axios from "axios";
import toast from "react-hot-toast";

const API_URL = "http://localhost:8000/api/admin/";

// Admin Login
const adminLogin = async (adminData) => {
  const response = await axios.post(API_URL + "login", adminData);
  if (response.data)
    localStorage.setItem("admin", JSON.stringify(response.data));
  return response.data;
};

// Admin Logout
const adminLogout = () => {
  localStorage.removeItem("admin");
};

// Get Users
const getUsers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

// Block User
const userBlock = async (token, userId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL + "block", { userId }, config);
  return response.data;
};

// Search user
const searchUser = async (query, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL + "search", { query }, config);
  return response.data;
};

// Edit user
const editUser = async (token, userId, name, email) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    API_URL + userId,
    { userId, name, email },
    config
  );
  return response.data;
};

// Add user
const addUser = async(userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL + "adduser", {userData}, config)
  toast.success("User added sucessfully")
  return response.data
}

const adminAuthService = {
  adminLogin,
  adminLogout,
  getUsers,
  userBlock,
  searchUser,
  editUser,
  addUser
};

export default adminAuthService;
