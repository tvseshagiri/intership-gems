import { useSelector } from "react-redux"

const Dashboard = () => {

    const userInfo = useSelector((state) => state.userInfo)

    return (
        <>
            <h2>Hello {userInfo.username}</h2>
        </>
    )
}

export default Dashboard;
