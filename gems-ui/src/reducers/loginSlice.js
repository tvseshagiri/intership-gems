import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthApi from "../services/AuthApi";

const initialState = {
    userInfo: {},
    token: '',
    message: {}
}


export const validateUser = createAsyncThunk(
    'login/validateUser',
    async ({ username, password }) => {
        console.log('In createAsyncThunk')
        const resp = await AuthApi.validateUser(username, password);
        console.log('Response data' + resp.data)
        return resp.data;
    }
)

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {

        performLogin: (state, action) => {
            const { username, password } = action.payload;
            console.log(username, password)
            if (validateUser(username, password)) {

                state.userInfo = {
                    username: 'rama',
                    role: 'Admin'
                }
            } else {
                state.message = 'Login Failed'
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(validateUser.fulfilled, (state, action) => {
            console.log(action)
            state.userInfo = {
                email: action.payload.email,
                role: action.payload.email,
            },
                state.token = action.payload.token;
            console.log(state.token)
        })
    }
})

export const { performLogin } = loginSlice.actions;
export default loginSlice.reducer;