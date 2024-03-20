import axios from "axios";

const API_URL = "/api/admin/";

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

const adminAuthService = {
  adminLogin,
  adminLogout,
  getUsers,
};

export default adminAuthService;
