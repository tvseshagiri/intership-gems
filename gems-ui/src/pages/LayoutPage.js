import * as React from 'react';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';


export default function Layout() {
    return (
        <Grid2 container spacing={2}>
            <Grid2 xs={12}>
                <Grid2 xs={8}>
                    <Header />
                </Grid2>
                <Grid2 sx={{ height: '100%' }}>
                    <Outlet />
                </Grid2>
            </Grid2>
        </Grid2 >
    );
}