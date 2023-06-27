import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { performLogin, validateUser } from '../reducers/loginSlice'

import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@mui/material'



const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch();

    const paperStyle = { padding: 20, height: '70vh', width: 280, margin: "20px auto" }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const btnstyle = { margin: '8px 0' }

    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}></Avatar>
                    <h2>Sign In</h2>
                </Grid>
                <TextField label='Username' value={username} onChange={(e) => { setUsername(e.target.value) }} placeholder='Enter username' variant="outlined" fullWidth required />
                <TextField label='Password' onChange={(e) => setPassword(e.target.value)} value={password} placeholder='Enter password' type='password' variant="outlined" fullWidth required />
                <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth onClick={() => dispatch(validateUser({ username, password }))}>Sign in</Button>
                <Typography >
                    <Link href="#" >
                        Forgot password ?
                    </Link>
                </Typography>
                <Typography > Do you have an account ?
                    <Link href="#" >
                        Sign Up
                    </Link>
                </Typography>
            </Paper>
        </Grid>
    )
}

export default Login