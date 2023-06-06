import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CsvUserItem, UserInterface } from "../../interfaces/UserInterface";
import * as csvUserApi from "../../services/api/csvUser-api"
import { getItem } from "../../services/settings/dataHandleSvc";

const csvUserInititalState: any = {
    retUsers: [],
    status: "idle",
    error: ""
};

const csvUserData: any = {
    csvUsers: [] as CsvUserItem[],
    userExist: false
};

const createCsvUser= createAsyncThunk(" /csv-users", async (csvUserList: CsvUserItem[]) => {
    try {
        const result = csvUserList.map((eachUser: CsvUserItem) => {
            const preparedList: any = {
                ...eachUser,
                Created_User_ID: getItem('user').ID,
                Updated_User_ID: getItem('user').ID,
            };
            return preparedList;
        });
        const reqData = {
            Users: result
        }
        const response = await csvUserApi.csvUserCreate(reqData);
        return response?.data;
    } catch (error: any) {
        console.error(error);
        return error;
    }
})

const csvUserSlice = createSlice({
    name: "csvUser",
    initialState: { csvUserInititalState, csvUserData },
    reducers: {
        addCsvList: (state, action) => {
            state.csvUserData.csvUsers = action.payload;
        },
        updateUser: (state, action) => {
            const id = action.payload.ID;
            state.csvUserData.csvUsers[id].Name = action.payload.Name ?
                action.payload.Name :
                state.csvUserData.csvUsers[id].Name;

            state.csvUserData.csvUsers[id].Description = action.payload.email ?
                action.payload.email :
                state.csvUserData.csvUsers[id].Email;

            state.csvUserData.csvUsers[id].Type = action.payload.type ?
                action.payload.type :
                state.csvUserData.csvUsers[id].Type;

            state.csvUserData.csvUsers[id].HasError = action.payload.HasError;
        },
        setInitialState: (state) => {
            state.csvUserData.csvUsers = [];
            state.csvUserData.userExist = false;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(createCsvUser.pending, (state) => {
                state.csvUserInititalState.status = "loading";
            })
            .addCase(createCsvUser.fulfilled, (state, action) => {
                state.csvUserInititalState.status = "succeeded";
                if (action.payload.data) {
                    state.csvUserData.csvUsers = action.payload.data;
                    state.csvUserData.csvUsers.forEach((eachUser: UserInterface) => {
                        eachUser.HasError = true;
                    });
                    state.csvUserData.userExist = true;
                } else {
                    state.csvUserData.userExist = false;
                }
            })
            .addCase(createCsvUser.rejected, (state, action) => {
                state.csvUserInititalState.status = "failed";
                state.csvUserInititalState.error = action.error?.message;
            })
    }
})
const getretUsers = (state: any) => state.authData;
const getretUsersError = (state: any) => state.error;
const getretUsersSts = (state: any) => state.status;
const getcsvUsers = (state: any) => state.csvUser.csvUserData.csvUsers;
const checkUserExist = (state: any) => state.csvUser.csvUserData.userExist;

export {
    createCsvUser,
    getretUsers,
    getcsvUsers,
    checkUserExist,
    getretUsersSts,
    getretUsersError
};
export const csvUserAction = csvUserSlice.actions;
export default csvUserSlice.reducer;