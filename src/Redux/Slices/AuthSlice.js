import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axiosInstance from "../../Helper/axiosInstance";
// import Cookies from "js-cookie";

// Initial State
const initialState = {
  isAuthenticated: false,
  token: null,
  user: null,
  error: null,
  loading: false,
};

// Helper function for async requests
const handleAsyncThunk = async (url, data, rejectWithValue) => {
  try {
    const response = await axiosInstance.post(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    const message = error?.response?.data?.message || "Something went wrong";
    return rejectWithValue(message);
  }
};

// Async Thunk for SignUp
export const signUpCreating = createAsyncThunk("/signup", (data, thunkAPI) =>
  handleAsyncThunk("/users/register", data, thunkAPI.rejectWithValue)
);

// Async Thunk for Login
export const login = createAsyncThunk(
  "/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/users/login", credentials);

      // const accessToken = response.data.data.accessToken;
      // const refreshToken = response.data.data.refreshToken;

      // // Set the cookie with token or any other data you want
      // Cookies.set("accessToken", accessToken, { expires: 7 }); // Expires in 7 days
      // Cookies.set("refreshToken", refreshToken, { expires: 30 }); // Expires in 30 days

      return response.data;
    } catch (error) {
      const message = error?.response?.data?.message || "Something went wrong";
      return rejectWithValue(message);
    }
  }
);

export const logOut = createAsyncThunk("/", async () => {
  try {
    await axiosInstance.post("/users/logout");
    toast.success("Logged out successfully");
    return true;
  } catch (error) {
    const message = error?.response?.data?.message || "Failed to log out";
    console.log(message);
    toast.error(message);
    toast.dismiss();
  }
});

// Toast management function
const handleToast = (state, action, isLoadingMessage, successMessage) => {
  state.loading = isLoadingMessage ? true : false;
  if (action?.payload?.error) {
    state.error = action.payload.error;
    toast.error(action.payload.error);
  } else {
    state.isAuthenticated = true;
    state.user = action?.payload?.user;
    state.token = action?.payload?.token;
    toast.success(successMessage);
  }
};

// Auth Slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Sign Up
      .addCase(signUpCreating.pending, (state) => {
        state.loading = true;
        toast.loading("Creating your account...");
      })
      .addCase(signUpCreating.fulfilled, (state, action) => {
        handleToast(state, action, false, "Account created successfully");
        toast.dismiss();
      })
      .addCase(signUpCreating.rejected, (state, action) => {
        state.loading = false;
        toast.dismiss();
        toast.error(action.payload);
      })

      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        toast.loading("Logging in...");
      })
      .addCase(login.fulfilled, (state, action) => {
        handleToast(state, action, false, "Logged in successfully");
        toast.dismiss();
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        toast.dismiss();
        toast.error(action.payload);
      });
  },
});

export default authSlice.reducer;
