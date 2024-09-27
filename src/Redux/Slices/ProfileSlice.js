import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axiosInstance from "../../Helper/axiosInstance";

const initialState = {
  userInfo: {},
  loading: false,
  error: null,
};

export const fetchUserInfo = createAsyncThunk(
  "profile/fetchUserInfo",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/users/current-user");
      return response.data.data;
    } catch (error) {
      const message =
        error?.response?.data?.message || "Failed to fetch user information";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        toast.success("User information fetched successfully!");
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload || "Error fetching user info");
      });
  },
});

export default profileSlice.reducer;
