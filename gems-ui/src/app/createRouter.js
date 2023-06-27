import { createBrowserRouter } from 'react-router-dom'
import Login from '../pages/LoginPage'
import Dashboard from '../pages/Dashboard'

export const router = createBrowserRouter([
    {
        path: '/',
        element: < Login />
    },
    {
        path: '/Dashboard',
        element: <Dashboard />
    },
])