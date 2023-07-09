import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ClaimApi from '../services/ClaimsApi'


const initialState = {
    message: null
}

export const getClaims = createAsyncThunk(
    'claim/getAllClaims',
    async () => {
        const resp = await ClaimApi.getClaims()
        return resp
    }
)

export const getUnsettledClaims = createAsyncThunk(
    'claim/getUnsettledClaims',
    async () => {
        const resp = await ClaimApi.getUnsettledClaims()
        return resp
    }
)

export const saveClaim = createAsyncThunk(
    'claim/createClaim',
    async (claim) => {
        const resp = await ClaimApi.saveClaim(claim)
        return resp.data
    }
)

export const deleteClaim = createAsyncThunk(
    'claim/deleteClaim',
    async (claimNumber) => {
        const resp = await ClaimApi.deleteClaim(claimNumber);
        return resp.data;
    }
)

export const updateClaim = createAsyncThunk(
    'claim/updateClaim',
    async (claimFormData) => {
        const resp = await ClaimApi.updateClaim(claimFormData);
        return resp.data;
    }
)


const claimSlice = createSlice({
    name: 'claim',
    initialState: initialState,
    reducers: {
    },
    extraReducers: {
        [saveClaim.fulfilled]: (state, action) => {
            console.log('Claim Created sucessflly')
        },
        [saveClaim.rejected]: (state, action) => {
            console.log('Error while creating claim' + action.error)
        },
    }
})


export const { resetMessage, setMessage } = claimSlice.actions;
export default claimSlice.reducer;