import { Route, createBrowserRouter } from 'react-router-dom'
import Login from '../pages/LoginPage'
import Dashboard from '../pages/Dashboard'
import ClaimApi from '../services/ClaimsApi'
import Layout from '../pages/LayoutPage'
import { RequireAuth } from '../components/RequireAuth'
import { NewClaimPage } from '../pages/NewClaimPage'
import { EditClaimPage } from '../pages/EditClaimPage'
import store from '../app/rootStore'


const loadClaims = async () => {
    let claims = await ClaimApi.getClaims();
    let userRole = store.getState().login && store.getState().login.userInfo.role;

    if (userRole === 'BudgetOwner') {
        console.log('Fetching Unsettled claims');
        let unsettledClaims = await ClaimApi.getUnsettledClaims();
        claims = claims.concat(unsettledClaims)
    }
    return claims;
}

const loadClaimById = async ({ params }) => {
    console.log(`Getting Claim Data for ${params.claimid}`)
    const claim = await ClaimApi.getClaimById(params.claimid);
    console.log(`Claim: ${JSON.stringify(claim)}`)
    return claim;
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
            path: '/editclaim/:claimid',
            loader: loadClaimById,
            element: <RequireAuth><EditClaimPage /></RequireAuth>
        }]




    }
])

