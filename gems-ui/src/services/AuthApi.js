import api from './httpCommon';


const validateUser = (username, password) => {
    return api.post('/login', { username, password })
}

const AuthApi = {
    validateUser
}

export default AuthApi;
