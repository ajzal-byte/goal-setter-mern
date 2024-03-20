import axios from "axios";

const API_URL = "/api/admin/";

// Admin Login
const adminLogin = async (adminData) => {
  const response = await axios.post(API_URL + "login", adminData);
  if (response.data)
    localStorage.setItem("admin", JSON.stringify(response.data));
  return response.data;
};

const adminAuthService = {
  adminLogin,
};

export default adminAuthService;