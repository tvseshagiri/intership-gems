import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { messageSelector, resetMessage, validateUser, setMessage } from '../reducers/loginSlice'

import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@mui/material'
import { useNavigate } from 'react-router-dom'



const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const message = useSelector(messageSelector)

    const paperStyle = { padding: 20, height: '70vh', width: 280, margin: "20px auto" }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const btnstyle = { margin: '8px 0' }

    async function submitLoign() {
        try {
            await dispatch(resetMessage())
            await dispatch(validateUser({ username, password })).unwrap()
            navigate('/dashboard')
        } catch (error) {
            setMessage('System Error, Please try after sometime')
        }
    }

    async function clearMessage() {
        await dispatch(resetMessage())
    }

    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}></Avatar>
                    <h2>Sign In</h2>
                </Grid>
                {message &&
                    <h2>{message}</h2>
                }
                <TextField label='Username' value={username} onChange={(e) => { setUsername(e.target.value) }} placeholder='Enter username' variant="outlined" fullWidth required />
                <TextField label='Password' onChange={(e) => setPassword(e.target.value)} value={password} placeholder='Enter password' type='password' variant="outlined" fullWidth required />
                <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth onClick={() => submitLoign()}>Sign in</Button>
            </Paper>
        </Grid>
    )
}

export default Login