import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import AuthApi from "../services/AuthApi";
import { useSelector } from "react-redux";

const initialState = {
    userInfo: {
        email: null,
        role: null
    },
    token: null,
    message: null
}

export const userInfoSelector = state => state.login.userInfo;
export const messageSelector = state => state.login.message;

export const validateUser = createAsyncThunk(
    'login/validateUser',
    async ({ username, password }) => {
        const resp = await AuthApi.validateUser(username, password);
        return resp.data;
    }
)

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        resetMessage(state, action) {
            state.message = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(validateUser.fulfilled, (state, action) => {

            state.userInfo.email = action.payload.user.email;
            state.userInfo.role = action.payload.user.role;
            state.token = action.payload.token

        }).addCase(validateUser.rejected, (state, action) => {
            state.message = 'Invalid Credentials'
            console.log(action.payload);
        })
    }
})

export const { resetMessage } = loginSlice.actions;
export default loginSlice.reducer;