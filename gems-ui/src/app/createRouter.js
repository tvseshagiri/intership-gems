import { createBrowserRouter, RouterProvider, } from 'react-router-dom'
import Login from '../pages/LoginPage'

const router = createBrowserRouter([
    {
        path: '/',
        element: < Login />
    },
    {
        path: '/Dashboard',
        element: < Dashboard />
    },
])