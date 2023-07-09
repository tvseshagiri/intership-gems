import { DataGrid, useGridApiRef } from '@mui/x-data-grid';
import { useLoaderData, useNavigate } from "react-router-dom";
import { Button, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { deleteClaim, getClaims, getUnsettledClaims } from '../reducers/claimSlice';
import { useState } from 'react';
import { userInfoSelector } from "../reducers/loginSlice";

const columns = [
    { field: 'number', headerName: 'Claim Number', width: 150 },
    { field: 'typeDesc', headerName: 'Category', width: 150 },
    { field: 'subTypeDesc', headerName: 'Sub Category', width: 150 },
    { field: 'amount', headerName: 'Amount', width: 150 },
    { field: 'generatedOn', headerName: 'Claim Date', width: 150 },
    { field: 'status', headerName: 'Status', width: 150 },
    {
        field: 'owner', headerName: 'Raised By', width: 150, renderCell: (params) => {
            return <div className="rowitem">{params.row.owner.firstName}, {params.row.owner.lastName}</div>;
        }
    },
];

const Dashboard = () => {

    const [claims, setClaims] = useState(useLoaderData());
    const navigate = useNavigate();
    const apiRef = useGridApiRef();
    const dispatch = useDispatch()
    const userInfo = useSelector(userInfoSelector)

    function navigateToClaimPage() {
        navigate('/newclaim');
    }

    async function callDeleteClaim() {
        let selectedRow = null;
        const selectRows = apiRef.current.getSelectedRows();
        if (selectRows.size == 0) {
            alert('Please select a claim to delete');
        } else {

            selectRows.forEach((row, rowId) => {
                selectedRow = row;
            })
            if (userInfo.email != selectedRow.owner.email) {
                alert('You cant delete this claim');
                return;
            } else {
                try {
                    await dispatch(deleteClaim(selectedRow['_id'])).unwrap()
                    let latestClaims = await dispatch(getClaims()).unwrap()
                    if (userInfo.role === 'BudgetOwner') {
                        let unsettledClaims = await dispatch(getUnsettledClaims()).unwrap()
                        latestClaims = latestClaims.concat(unsettledClaims)
                    }
                    setClaims(latestClaims);
                } catch (err) {
                    console.log(err)
                    alert(`Error while Deleting claim. ${err.message}`)
                }
            }
        }

    }

    async function callEditClaim() {
        let selectedRow = null;
        const selectRows = apiRef.current.getSelectedRows();
        if (selectRows.size == 0) {
            alert('Please select a claim to delete');
        } else {

            selectRows.forEach((row, rowId) => {
                selectedRow = row;
            })

            navigate(`/editclaim/${selectedRow['_id']}`)
        }

    }

    return (
        <>
            <h2>Dashboard</h2>
            <div style={{ height: 300, width: '100%' }}>
                <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                    <Button size="small" onClick={() => navigateToClaimPage()}>
                        Create Claim
                    </Button>
                    <Button size="small" onClick={() => callEditClaim()}>
                        Edit Claim
                    </Button>
                    <Button size="small" onClick={() => callDeleteClaim()}>
                        Delete Claim
                    </Button>
                </Stack>
                <DataGrid rows={claims} columns={columns} apiRef={apiRef} getRowId={(row) => row._id} sx={{
                }} />
            </div>
        </>
    )
}

export default Dashboard;
