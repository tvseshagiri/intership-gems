import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import loginReducer from '../reducers/loginSlice';
import claimReducer from '../reducers/claimSlice';

const store = configureStore({
    reducer: {
        login: loginReducer,
        claim: claimReducer
    }, devTools: true
})

export default store;



