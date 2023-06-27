import { useSelector } from "react-redux"
import { userInfoSelector } from "../reducers/loginSlice"
const Dashboard = () => {

    const userInfo = useSelector(userInfoSelector)

    return (
        <>
            <h2>Hello {userInfo.email}</h2>
        </>
    )
}

export default Dashboard;
