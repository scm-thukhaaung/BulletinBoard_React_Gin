import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as auth from "../../services/api/auth-api"
import { getItem, setItem } from "../../services/settings/dataHandleSvc";

const authInititalState: any = {
    authData: getItem("auth")? getItem("auth") : {},
    status: "idle",
    error: "",
    type: "user"
}

const authenticate = createAsyncThunk("auth/login", async (loginData: any) => {
    try {
        const response = await auth.login(loginData);
        return response?.data;
    } catch (error: any) {
        console.error(error); 
        throw error;
    }
})

const authSlice = createSlice({
    name: "auth",
    initialState: authInititalState,
    reducers: {

    },
    extraReducers(builder) {
        builder
            .addCase(authenticate.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(authenticate.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.authData = action.payload?.data;
                setItem('user', state.authData?.User)
                setItem('token', state.authData?.Token)
                setItem('auth', state.authData)

                if (action.payload?.data.User.Type === "0") {
                    state.type = "admin"
                }
            })
            .addCase(authenticate.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error?.message;
            })
    }
})
const getAuthUser = (state: any) => state.authData;
const getAuthError = (state: any) => state.error;
const getAuthStatus = (state: any) => state.status;
const getAuthType = (state: any) => state.auth.type;

export { authenticate, getAuthUser, getAuthError, getAuthStatus, getAuthType }
export default authSlice.reducer