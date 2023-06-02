import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserInterface } from "../../interfaces/UserInterface";
import * as userApi from "../../services/api/user-api"

const userListInitialState: any = {
    userList: [] as UserInterface[],
    isEditMode: false,
    updateUserData: {} as UserInterface,
    status: "idle",
    error: ""
};

const createUser = createAsyncThunk("/users/create", async (userData: any) => {
    try {
        const response = await userApi.createUser(userData);
        return response?.data;
    } catch (error) {
        console.error(error);
        return;
    }
})

const getUserList = createAsyncThunk("/users", async () => {
    try {
        const response = await userApi.getFindAll();
        return response?.data;
    } catch (error) {
        console.error(error);
        return;
    }
});

const getOneUser = createAsyncThunk("/users/get-one", async (userId: string | undefined) => {
    try {
        const response = await userApi.getFindOne(Number(userId));
        return response?.data;
    } catch (error) {
        console.error(error);
        return;
    }
})

const updateUser = createAsyncThunk("/users/update", async (userData: any) => {
    try {
        await userApi.updateUser(userData, userData.ID);
        const retData: any = {
            userData: userData,
            id: userData.ID
        }
        return retData;
    } catch (error) {
        console.error(error);
        return;
    }
})

const deleteFromList = createAsyncThunk("/users/delete", async (userId: any) => {
    try {
        await userApi.deleteUser(userId);
        return userId;
    } catch (error) {
        console.error(error);
        return;
    }
});

const usersSlice = createSlice({
    name: "users",
    initialState: userListInitialState,
    reducers: {
        setEditMode(state, action) {
            state.isEditMode = true;
            state.updateUserData = action.payload;
            console.log('updateMode is-=> ', state.isEditMode, state.updateUserData)
        },
    },
    extraReducers(builder) {
        builder
            .addCase(createUser.fulfilled, (state, action) => {
                console.log('getUserList fulfilled:', action.payload);
                state.status = "succeeded";
                state.userList = [...state.userList, action.payload.data];
                console.log('state-=-> ', state.status, state.userList)
            })
            .addCase(createUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error?.message;
            })
            .addCase(getUserList.fulfilled, (state, action) => {
                console.log('getUserList fulfilled:', action.payload);
                state.status = "succeeded";
                state.userList = action.payload.data;
                console.log('state-=-> ', state.status, state.userList)
            })
            .addCase(getUserList.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error?.message;
            })
            .addCase(deleteFromList.fulfilled, (state, action) => {
                console.log('deleteUser fulfilled:', action.payload);
                state.status = "succeeded";
                const id = action.payload;
                console.log('state-=-> ', action.payload, state.userList)
                const tmpList = state.userList.filter((user: UserInterface) => user.ID !== id);
                state.userList = tmpList;
                console.log('deletd list-=-> ', state.userList)
            })
            .addCase(deleteFromList.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error?.message;
            })
            .addCase(getOneUser.fulfilled, (state, action) => {
                console.log('getUserList fulfilled:', action.payload);
                state.status = "succeeded";
                state.updateUserData = action.payload.data;
                console.log('state-=-> ', state.status, state.updateUserData)
            })
            .addCase(getOneUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error?.message;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                console.log('getUserList fulfilled:', action.payload);
                state.status = "succeeded";
                state.userList[action.payload.id] = action.payload.userData;
                console.log('state-=-> ', state.status, state.userList)
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error?.message;
            })
    }
})
const getuserListData = (state: any) => state.users.userList;
const getuserListError = (state: any) => state.users.error;
const getuserListSts = (state: any) => state.users.status;
const getEditMode = (state: any) => state.users.isEditMode;
const getEditUser = (state: any) => state.users.updateUserData;

export {
    createUser,
    getUserList,
    getOneUser,
    updateUser,
    deleteFromList,
    getuserListData,
    getuserListSts,
    getuserListError,
    getEditMode,
    getEditUser
};
export const userSliceAction = usersSlice.actions;
export default usersSlice.reducer;