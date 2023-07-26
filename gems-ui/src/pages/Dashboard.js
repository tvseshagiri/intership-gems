
import { useLoaderData, useNavigate } from "react-router-dom";
import { IconButton, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { deleteClaim, getClaims, getUnsettledClaims } from '../reducers/claimSlice';
import { React, useState } from 'react';
import { userInfoSelector } from "../reducers/loginSlice";
import ClaimList from "../components/ClaimsList";
import { useGridApiRef } from "@mui/x-data-grid";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

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

            selectRows.forEach((row) => {
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

            selectRows.forEach((row) => {
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
                    <IconButton aria-label="delete" onClick={() => navigateToClaimPage()} color="primary" size="large">
                        <AddIcon fontSize="inherit" />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => callEditClaim()} color="primary" size="large">
                        <EditIcon fontSize="inherit" />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => callDeleteClaim()} color="error" size="large">
                        <DeleteIcon fontSize="inherit" />
                    </IconButton>
                </Stack>
                <ClaimList claims={claims} apiRef={apiRef} />
            </div>
        </>
    )
}

export default Dashboard;
