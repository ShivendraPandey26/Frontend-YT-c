import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-hot-toast'
 
const initialState = {
  isAuthenticated: false,
  token: null,
  user: null,
  error: null,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

export default authSlice.reducer;
