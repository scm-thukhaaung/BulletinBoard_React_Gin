import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as posts from "../../services/api/post-api"

const postInititalState: any = {
    posts: [],
    status: "idle",
    error: ""
}

const getAllPosts = createAsyncThunk("posts/getAllPosts", async () => {
    const response = await posts.getFindAll()
    console.log(response.data)
    return response?.data;
})

const postsSlice = createSlice({
    name: "posts",
    initialState: postInititalState,
    reducers: {

    },
    extraReducers(builder) {
        builder
            .addCase(getAllPosts.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(getAllPosts.fulfilled, (state, action) => {
                console.log(action, "...action")
                state.status = "succeeded";
                state.posts = state.posts.concat(action.payload?.data)
            })
            .addCase(getAllPosts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error?.message;
            })
    }
})

const selectAllPosts = (state: any) => state.posts.posts;
const getPostsError = (state: any) => state.posts.error;
const getPostsStatus = (state: any) => state.posts.status;
export {selectAllPosts, getPostsError, getPostsStatus} 
export {getAllPosts} 
export default postsSlice.reducer