import { createSlice } from "@reduxjs/toolkit";

type csvItem = {
    id: number;
    title: string;
    description: string;
    status: string;
    hasError: boolean ;
};

export const csvPostSlice = createSlice({
    name: "csvPost",
    initialState: {
        csvPosts: [] as csvItem[],
    },
    reducers: {
        addCsvList: (state, action) => {
            state.csvPosts = action.payload;
            console.log('state-=-> ', state.csvPosts)
        },
        updatePost: (state, action) => {
            const id = action.payload.id;
            state.csvPosts[id].title = action.payload.title ? action.payload.title : state.csvPosts[id].title;
            state.csvPosts[id].description = action.payload.description ? action.payload.description : state.csvPosts[id].description;
            state.csvPosts[id].status = action.payload.status ? action.payload.status : state.csvPosts[id].status;
            state.csvPosts[id].hasError = action.payload.hasError;
            console.log('payload-=> ', action.payload)
            console.log(state.csvPosts[id])

        },
        deleteTask: (state, action) => {
            const idxTask = state.csvPosts.findIndex(
                (task) => task.id === action.payload
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
