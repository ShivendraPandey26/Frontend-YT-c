import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./Slices/AuthSlice.js"
import profileSliceReducer from "./Slices/ProfileSlice.js"

const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        profile: profileSliceReducer,
    }
});


export default store;