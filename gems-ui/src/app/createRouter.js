import { Route, createBrowserRouter } from 'react-router-dom'
import Login from '../pages/LoginPage'
import Dashboard from '../pages/Dashboard'
import ClaimApi from '../services/ClaimsApi'
import Layout from '../pages/LayoutPage'
import { RequireAuth } from '../components/RequireAuth'
import { NewClaimPage } from '../pages/NewClaimPage'
import { EditClaimPage } from '../pages/EditClaimPage'

const loadClaims = async () => {
    return ClaimApi.getClaims();
}

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [{
            path: '',
            element: <Login />
        }, {
            path: '/dashboard',
            loader: loadClaims,
            element: <RequireAuth><Dashboard /></RequireAuth>
        }, {
            path: '/newclaim',
            element: <RequireAuth><NewClaimPage /></RequireAuth>
        }, {
            path: '//editclaim/:claimid',
            element: <RequireAuth><EditClaimPage /></RequireAuth>
        }]




    }
])

