import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { userInfoSelector } from '../reducers/loginSlice'

export function RequireAuth({ children }) {
    const userInfo = useSelector(userInfoSelector);
    let location = useLocation();

    if (!userInfo.email) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return children;
}