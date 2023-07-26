import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { messageSelector, resetMessage, validateUser, setMessage, statusSelector } from '../reducers/loginSlice'

import { Grid, Paper, Avatar, TextField, Button, Typography, Link, Alert, CircularProgress, Backdrop } from '@mui/material'
import { useNavigate } from 'react-router-dom'



const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const message = useSelector(messageSelector)
    const statusIndicator = useSelector(statusSelector)


    const paperStyle = { padding: 20, height: '70vh', width: 280, margin: "20px auto" }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const btnstyle = { margin: '8px 0' }

    useEffect(() => {
        if (statusIndicator === 'success') {
            navigate('/dashboard')
        }
    }, [statusIndicator])

    async function submitLoign() {
        dispatch(validateUser({ username, password }))
    }

    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}></Avatar>
                    <h2>Sign In</h2>
                </Grid>
                {message &&
                    <Alert severity="error">{message}</Alert>
                }
                {(statusIndicator && statusIndicator === 'pending') &&
                    <Backdrop open={statusIndicator === 'pending'}>
                        <CircularProgress />
                    </Backdrop>
                }
                <TextField label='Username' value={username} onChange={(e) => { setUsername(e.target.value) }} placeholder='Enter username' variant="outlined" fullWidth required type='email' />
                <TextField label='Password' onChange={(e) => setPassword(e.target.value)} value={password} placeholder='Enter password' type='password' variant="outlined" fullWidth required />
                <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth onClick={() => submitLoign()}>Sign in</Button>
            </Paper>
        </Grid >
    )
}

export default Login