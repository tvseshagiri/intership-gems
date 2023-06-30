
import api from './httpCommon';


const getClaims = async () => {

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
    const resp = await api.get('/api/claims', { headers: headers })
    return resp.data
}

const ClaimApi = {
    getClaims
}

export default ClaimApi;
