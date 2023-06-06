import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as posts from "../../services/api/post-api";
import { getItem } from "../../services/settings/dataHandleSvc";

const postInititalState: any = {
    posts: [],
    status: "idle",
    error: ""
};

const tempPostState: any = {
    post: {},
    status: "idle",
    error: "",
    newPost: true,
};

const getAllPosts = createAsyncThunk("posts/getAllPosts", async () => {
    try{
        const response = await posts.getFindAll();
        return response?.data;
    } catch (error: any) {
        return error;
    }
});

const deletePost = createAsyncThunk("posts/deletePost", async (initialPost: any) => {
    const { id } = initialPost;
    try {
        const response = await posts.deletePost(id);
        if (response.status === 200) return initialPost;
        return `${response.status} : ${response.statusText}`;
    } catch (error: any) {
        return error.message;
    }
});

const createPost = createAsyncThunk("posts/createPost", async (initialPost: any) => {
    const body = {
        Title: initialPost.Title,
        Description: initialPost.Description,
        Status: "1",
        Created_User_ID: getItem('user').ID,
        Updated_User_ID: getItem('user').ID
    };

    try {
        const response = await posts.postCreate(JSON.stringify(body));
        if (response.status === 200) return response?.data;
        return `${response.status} : ${response.statusText}`;
    } catch (error: any) {
        throw error;
    }
});

const updatePost = createAsyncThunk("posts/updatePost", async (initialPost: any) => {
    const body = {
        title: initialPost.Title,
        description: initialPost.Description,
        status: initialPost.Status.toString(),
        updated_user_id: 2
    };

    try {
        const response = await posts.postUpdate(JSON.stringify(body), initialPost.ID);
        if (response.status === 200) return response?.data;
        return `${response.status} : ${response.statusText}`;
    } catch (error: any) {
        return error.message;
    }
});

const postsSlice = createSlice({
    name: "posts",
    initialState: { postInititalState, tempPostState },
    reducers: {
        setTempPost(state, action) {
            state.tempPostState.post = action.payload;
            state.tempPostState.newPost = false;
        },
        clearTempPost(state) {
            state.tempPostState.post.Title = "";
            state.tempPostState.post.Description = "";
            state.tempPostState.newPost = true;
        },
        setInputTempPost(state, action) {
            if (action.payload.title) {
                state.tempPostState.post.Title = action.payload.title;
            }

            if (action.payload.description) {
                state.tempPostState.post.Description = action.payload.description;
            }
            if (action.payload.status === "0" || action.payload.status === "1") {
                state.tempPostState.post.Status = action.payload.status;
            }
        },
        searchPost(state, action) {
            if ( action.payload.searchValue ) {
                  const givenString = action.payload.searchValue;
                  
                  const filteredArray = state.postInititalState.posts.filter((obj: any) => obj.Title.toLowerCase().includes(givenString.toLowerCase()));
                  
                  state.postInititalState.posts = filteredArray;
            }
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getAllPosts.pending, (state, action) => {
                state.postInititalState.status = "loading";
            })
            .addCase(getAllPosts.fulfilled, (state, action) => {

                state.postInititalState.status = "succeeded";
                state.postInititalState.posts = state.postInititalState.posts.concat(action.payload?.data);
            })
            .addCase(getAllPosts.rejected, (state, action) => {
                state.postInititalState.status = "failed";
                state.postInititalState.error = action.error?.message;
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                if (!action?.payload.id) {
                    return;
                }
                const { id } = action.payload;
                const oldPosts = state.postInititalState.posts.filter((post: any) => post.ID !== id);

                state.postInititalState.posts = oldPosts;
            })
            .addCase(createPost.fulfilled, (state, action) => {
                if (!action?.payload) {
                    return;
                }
                state.postInititalState.posts = state.postInititalState.posts.concat(action.payload?.data);
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                if (!action?.payload) {
                    return;
                }


                state.postInititalState.posts = state.postInititalState.posts.map((post: any) => {
                    if (post.ID === action.payload.data.ID) {
                        return action.payload.data
                    }

                    return post
                })
            });

    }
});

const selectAllPosts = (state: any) => state.posts.postInititalState.posts;
const getPostsError = (state: any) => state.posts.postInititalState.error;
const getPostsStatus = (state: any) => state.posts.postInititalState.status;
const selectTempPost = (state: any) => state.posts.tempPostState.post;
const isNewPost = (state: any) => state.posts.tempPostState.newPost;
const checkStatus = (state: any) => state.posts.tempPostState.post.Status;

export { selectAllPosts, getPostsError, getPostsStatus, selectTempPost, isNewPost, checkStatus };

export { getAllPosts, deletePost, createPost, updatePost };

export const postsAction = postsSlice.actions;
export default postsSlice.reducer;