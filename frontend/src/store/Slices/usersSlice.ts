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
        return error;
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
        },
    },
    extraReducers(builder) {
        builder
            .addCase(createUser.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.userList = [...state.userList, action.payload.data];
            })
            .addCase(createUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error?.message;
            })
            .addCase(getUserList.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(getUserList.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.userList = action.payload.data;
            })
            .addCase(getUserList.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error?.message;
            })
            .addCase(deleteFromList.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(deleteFromList.fulfilled, (state, action) => {
                state.status = "succeeded";
                const id = action.payload;
                const tmpList = state.userList.filter((user: UserInterface) => user.ID !== id);
                state.userList = tmpList;
            })
            .addCase(deleteFromList.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error?.message;
            })
            .addCase(getOneUser.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(getOneUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.updateUserData = action.payload.data;
            })
            .addCase(getOneUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error?.message;
            })
            .addCase(updateUser.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.userList[action.payload.id] = action.payload.userData;
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