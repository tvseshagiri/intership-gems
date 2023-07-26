import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { logoutUser, userInfoSelector } from "../reducers/loginSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import React from 'react';

export function Header() {

    const userInfo = useSelector(userInfoSelector);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function doLogout() {
        dispatch(logoutUser());
        navigate('/')
    }

    function isLoggedIn() {

        if (userInfo && userInfo.email) {
            return (
                <>
                    <Typography variant="h6">
                        Hello, {userInfo.firstName} {userInfo.lastName}
                    </Typography >
                    < Button color="inherit" onClick={() => { doLogout() }}>Logout</Button>
                </>
            )
        }
    }


    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Expenses Management System
                    </Typography>

                    {isLoggedIn()}
                </Toolbar>
            </AppBar>
        </Box >
    )
}