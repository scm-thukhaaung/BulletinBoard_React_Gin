import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as users from "../../services/api/user-api";

const UserInititalState: any = {
    users: [],
    status: "idle",
    error: ""
}

const getAllUsers = createAsyncThunk("users/getAllUsers", async () => {
    const response = await users.getAllUsers()
    // console.log(response.data)
    return response;
})

const usersSlice = createSlice({
    name: "users",
    initialState: UserInititalState,
    reducers: {

    },
    extraReducers(builder) {
        builder
            .addCase(getAllUsers.pending, (state, action) => {
                state.status = "loading";
                console.log("state status-=-> ", state.status)
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.users = state.users.concat(action.payload)
                console.log("..action.payload==> ", action.payload)
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error?.message;
                console.log(".fail==> ", state.error)
            })
    }
})

const selectAllUsers = (state: any) => state.users.users;
const getUsersError = (state: any) => state.users.error;
const getUsersStatus = (state: any) => state.users.status;
export {selectAllUsers, getUsersError, getUsersStatus} 
export {getAllUsers} 
export default usersSlice.reducer