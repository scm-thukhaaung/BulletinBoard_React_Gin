import { configureStore } from "@reduxjs/toolkit";
import postsReducer from './Slices/postsSlice';
import usersReducer from './Slices/usersSlice';

const store = configureStore({
    reducer: {
        posts: postsReducer,
        users: usersReducer
    }
});

export default store