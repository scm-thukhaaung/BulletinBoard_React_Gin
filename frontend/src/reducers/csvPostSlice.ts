import { createSlice } from "@reduxjs/toolkit";
import { CsvPostItem } from "../interfaces/PostInterface";


export const csvPostSlice = createSlice({
    name: "csvPost",
    initialState: {
        csvPosts: [] as CsvPostItem[],
    },
    reducers: {
        addCsvList: (state, action) => {
            state.csvPosts = action.payload;
        },
        updatePost: (state, action) => {
            const id = action.payload.ID;
            state.csvPosts[id].Title = action.payload.Title ? action.payload.Title : state.csvPosts[id].Title;
            state.csvPosts[id].Description = action.payload.description ? action.payload.description : state.csvPosts[id].Description;
            state.csvPosts[id].Status = action.payload.status ? action.payload.status : state.csvPosts[id].Status;
            state.csvPosts[id].HasError = action.payload.HasError;
        },
        deleteTask: (state, action) => {
            const idxTask = state.csvPosts.findIndex(
                (task) => task.ID === action.payload
            );
            state.csvPosts.splice(idxTask, 1);
        },
    }
});

export const {
    addCsvList,
    updatePost,
    deleteTask,
} = csvPostSlice.actions;

export default csvPostSlice.reducer;
