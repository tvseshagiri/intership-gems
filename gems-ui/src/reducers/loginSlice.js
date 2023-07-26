import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import AuthApi from "../services/AuthApi";

const initialState = {
    userInfo: {
        firstName: null,
        secondName: null,
        division: null,
        email: null,
        role: null
    },
    message: null,
    loadingStatus: null
}

export const userInfoSelector = state => state.login.userInfo;
export const messageSelector = state => state.login.message;
export const statusSelector = state => state.login.loadingStatus;

export const validateUser = createAsyncThunk(
    'login/validateUser',
    async ({ username, password }) => {
        const resp = await AuthApi.validateUser(username, password);
        return resp.data;
    }
)

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        resetMessage(state, action) {
            state.message = null;
        },
        setMessage(state, action) {
            state.message = action.payload.message;
        },
        logoutUser(state) {
            state.userInfo = null;
            state.message = null;
            state.loadingStatus = null;
            localStorage.clear();
        }
    },
    extraReducers: (builder) => {
        builder.addCase(validateUser.fulfilled, (state, action) => {
            state.loadingStatus = 'success'
            state.userInfo.email = action.payload.user.email;
            state.userInfo.role = action.payload.user.role;
            state.userInfo.firstName = action.payload.user.firstName;
            state.userInfo.lastName = action.payload.user.lastName;
            state.userInfo.division = action.payload.user.division;
            localStorage.setItem('token', action.payload.token)

        }).addCase(validateUser.rejected, (state, action) => {
            state.loadingStatus = 'error'
            if (action.error.code === 'ERR_BAD_RESPONSE') {
                state.message = 'Error while processing request'
            } else {
                state.message = 'Invalid Credentials'
            }
        }).addCase(validateUser.pending, (state) => {
            state.loadingStatus = 'pending'
        })
    }
})

export const { resetMessage, setMessage, logoutUser } = loginSlice.actions;
export default loginSlice.reducer;