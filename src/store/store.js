import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../features/authSlice"
import postReducer from "../features/postSlice"
import likeSlice from "../features/likeSlice";

export const store = configureStore({
    reducer:{
        auth: authReducer,
        posts: postReducer,
        likes: likeSlice,
    }
});