import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as auth from "../../services/api/auth-api"
import { setItem } from "../../services/settings/dataHandleSvc";

const authInititalState: any = {
    authData: {},
    status: "idle",
    error: ""
}

const authenticate = createAsyncThunk("auth/login", async (loginData: any) => {
    try {
        const response = await auth.login(loginData);
        return response?.data;
    } catch (error: any) {
        console.error(error); 
        return error;
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
                console.log('loading');
            })
            .addCase(authenticate.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.authData = action.payload?.data;
                console.log("...succeed", action.payload?.data)
                console.log('state.authData-=-> ', state.authData)
                setItem('user', state.authData?.User)
                setItem('token', state.authData?.Token)
            })
            .addCase(authenticate.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error?.message;
                console.log("...fail", action.error)
            })
    }
})
const getAuthUser = (state: any) => state.authData;
const getAuthError = (state: any) => state.error;
const getAuthStatus = (state: any) => state.status;
export { authenticate, getAuthUser, getAuthError, getAuthStatus }
export default authSlice.reducer