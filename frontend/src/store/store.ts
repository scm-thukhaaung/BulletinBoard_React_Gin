import { configureStore } from "@reduxjs/toolkit";
import csvPostReducer from "./Slices/csvPostSlice";
import csvUserReducer from "./Slices/csvUserSlice";
import postsReducer from './Slices/postsSlice';
import usersReducer from './Slices/usersSlice';
import authReducer from './Slices/authSlice';


const store = configureStore({
    reducer: {
        auth: authReducer,
        posts: postsReducer,
        users: usersReducer,
        csvPost: csvPostReducer,
        csvUser: csvUserReducer
    }
});

export default store
