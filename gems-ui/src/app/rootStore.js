import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import loginReducer from '../reducers/loginSlice';

const store = configureStore({
    reducer: {
        login: loginReducer
    }, devTools: true
})

export default store;



