import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CsvPostItem, Post } from "../../interfaces/PostInterface";
import * as csvPostApi from "../../services/api/csvPost-api"
import { getItem } from "../../services/settings/dataHandleSvc";

const csvPostInititalState: any = {
    retPosts: [],
    status: "idle",
    error: ""
};

const csvPostData: any = {
    csvPosts: [] as CsvPostItem[],
    postExist: false
};

const createCsvPost = createAsyncThunk(" /csv-posts", async (csvPostList: CsvPostItem[]) => {
    try {
        const result = csvPostList.map((eachPost: CsvPostItem) => {
            const preparedList: Post = {
                ...eachPost,
                Created_User_ID: getItem('user').ID,
                Updated_User_ID: getItem('user').ID,

            };
            return preparedList;
        });
        const reqData = {
            Posts: result
        }
        const response = await csvPostApi.csvPostCreate(reqData);
        return response?.data;
    } catch (error: any) {
        console.error(error);
        return error;
    }
})

const csvPostSlice = createSlice({
    name: "csvPost",
    initialState: { csvPostInititalState, csvPostData },
    reducers: {
        addCsvList: (state, action) => {
            state.csvPostData.csvPosts = action.payload;
        },
        updatePost: (state, action) => {
            const id = action.payload.ID;
            state.csvPostData.csvPosts[id].Title = action.payload.Title ?
                action.payload.Title :
                state.csvPostData.csvPosts[id].Title;

            state.csvPostData.csvPosts[id].Description = action.payload.description ?
                action.payload.description :
                state.csvPostData.csvPosts[id].Description;

            state.csvPostData.csvPosts[id].Status = action.payload.status ?
                action.payload.status :
                state.csvPostData.csvPosts[id].Status;

            state.csvPostData.csvPosts[id].HasError = action.payload.HasError;
        },
        setInitialState: (state) => {
            state.csvPostData.csvPosts = [];
            state.csvPostData.postExist = false;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(createCsvPost.pending, (state) => {
                state.csvPostInititalState.status = "loading";
            })
            .addCase(createCsvPost.fulfilled, (state, action) => {
                state.csvPostInititalState.status = "succeeded";
                if (action.payload.data) {
                    state.csvPostData.csvPosts = action.payload.data;
                    state.csvPostData.csvPosts.forEach((eachPost: Post) => {
                        eachPost.HasError = true;
                    });
                    state.csvPostData.postExist = true;
                } else {
                    state.csvPostData.postExist = false;
                }
            })
            .addCase(createCsvPost.rejected, (state, action) => {
                state.csvPostInititalState.status = "failed";
                state.csvPostInititalState.error = action.error?.message;
            })
    }
})
const getretPosts = (state: any) => state.authData;
const getretPostsError = (state: any) => state.error;
const getretPostsSts = (state: any) => state.status;
const getCsvPosts = (state: any) => state.csvPost.csvPostData.csvPosts;
const checkPostExist = (state: any) => state.csvPost.csvPostData.postExist;

export {
    createCsvPost,
    getretPosts,
    getCsvPosts,
    checkPostExist,
    getretPostsSts,
    getretPostsError
};
export const csvPostAction = csvPostSlice.actions;
export default csvPostSlice.reducer;