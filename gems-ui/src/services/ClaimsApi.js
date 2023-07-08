
import api from './httpCommon';

function getHeaders() {
    const token = localStorage.getItem('token')

    // For now, if no token, means user not authenticated, hence returning empty array and 
    //user will be redirected to login page as per router configuration.
    if (!token) {
        return Promise.resolve([])
    }

    headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`

    }
    return headers;
}

const getClaims = async () => {
    const resp = await api.get('/api/claims', { headers: getHeaders() })
    return resp.data;
}

const saveClaim = (claim) => {
    return api.post('/api/claims', claim, { headers: getHeaders() })
}

const deleteClaim = (claimid) => {
    return api.delete(`/api/claims/${claimid}`, { headers: getHeaders() })
}

const getClaimById = async (claimid) => {
    const resp = await api.get(`/api/claims/${claimid}`, { headers: getHeaders() })
    return resp.data
}

const getUnsettledClaims = async () => {
    const resp = await api.get(`/api/unsettledclaims`, { headers: getHeaders() })
    return resp.data
}

const ClaimApi = {
    getClaims,
    saveClaim,
    deleteClaim,
    getClaimById,
    getUnsettledClaims
}

export default ClaimApi;
