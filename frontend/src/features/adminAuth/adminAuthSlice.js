import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import adminAuthService from "./adminService";

// Get admin from local storage
const admin = JSON.parse(localStorage.getItem("admin"));

const initialState = {
  admin: admin ? admin : null,
  users: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  isUserAdded: false,
  message: "",
};

// Admin Login
export const adminLogin = createAsyncThunk(
  "auth/adminLogin",
  async (admin, thunkAPI) => {
    try {
      return await adminAuthService.adminLogin(admin);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Admin Logout
export const adminLogout = createAsyncThunk("auth/logout", async () => {
  await adminAuthService.adminLogout();
});

// Get Users
export const getUsers = createAsyncThunk(
  "auth/getUsers",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().adminAuth.admin.token;
      const response = await adminAuthService.getUsers(token);
      return response.users;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Block user
export const userBlock = createAsyncThunk(
  "admin/userBlock",
  async (userId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().adminAuth.admin.token;
      return await adminAuthService.userBlock(token, userId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Search user
export const searchUser = createAsyncThunk(
  "admin/searchUser",
  async (query, thunkAPI) => {
    try {
      const token = thunkAPI.getState().adminAuth.admin.token;
      return await adminAuthService.searchUser(query, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Edit user
export const editUser = createAsyncThunk(
  "admin/editUser",
  async ({ userId, name, email }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().adminAuth.admin.token;
      return await adminAuthService.editUser(token, userId, name, email);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
      state.isUserAdded = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.admin = action.payload;
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(adminLogout.fulfilled, (state, action) => {
        state.admin = null;
      })
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload;
      })
      .addCase(userBlock.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userBlock.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload.users;
      })
      .addCase(userBlock.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(searchUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload.users;
      })
      .addCase(searchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(editUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload.users;
      })
      .addCase(editUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
