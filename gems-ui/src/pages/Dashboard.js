import { useSelector } from "react-redux";
import { userInfoSelector } from "../reducers/loginSlice";
import { DataGrid } from '@mui/x-data-grid';
import { useLoaderData, useNavigate } from "react-router-dom";

const columns = [
    { field: 'number', headerName: 'Claim Number', width: 150 },
    { field: 'type', headerName: 'Category', width: 150 },
    { field: 'subType', headerName: 'Sub Category', width: 150 },
    { field: 'amount', headerName: 'Amount', width: 150 },
    { field: 'generatedOn', headerName: 'Claim Date', width: 150 },
];

const Dashboard = () => {

    const claims = useLoaderData();
    const navigate = useNavigate();

    function navigateToClaimPage() {
        navigate('/newclaim');
    }

    return (
        <>
            <h2>Dashboard</h2>
            <div style={{ height: 300, width: '100%' }}>
                <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                    <Button size="small" onClick={navigateToClaimPage()}>
                        Create Claim
                    </Button>
                </Stack>
                <DataGrid rows={claims} columns={columns} getRowId={(row) => row._id} sx={{
                }} />
            </div>
        </>
    )
}

export default Dashboard;
