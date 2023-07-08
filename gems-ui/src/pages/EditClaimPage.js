import { Container, Paper, InputLabel, MenuItem, Select, Typography, Grid, TextField, Button } from "@mui/material"
import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { userInfoSelector } from "../reducers/loginSlice";
import { useSelector } from "react-redux";

export function EditClaimPage() {

    const [claim, setClaim] = useState(useLoaderData());
    const navigate = useNavigate();
    const userInfo = useSelector(userInfoSelector)

    const subCategories = {
        'CCT': [['DOM', 'INL'], ['Domestic', 'International']],
        'CCE': [['FOD', 'OUN'], ['Food', 'Outing']],
        'CCP': [['HRD', 'SFT'], ['Hardware', 'Software']],
    }

    function onCategorySelect(e) {
        setClaim({ ...claim, type: e.target.value })
        setType(e.target.value)
    }

    function generateSubCat() {
        if (subCategories.hasOwnProperty(claim.type)) {
            const options = subCategories[claim.type][0].map((val, i) => {
                return <MenuItem value={val}>{subCategories[claim.type][1][i]}</MenuItem>
            })
            return options;
        }
    }

    function canApprove() {
        return userInfo.role === 'BudgetOwner' &&
            userInfo.email != claim.owner.email
            ? true : false;
    }

    function callUpdateClaim() {
        alert(JSON.stringify(claim));
    }

    function gotoDashboard() {
        navigate('/dashboard')
    }

    return (

        <>

            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <h2>Dashboard</h2>

                    <Grid container spacing={3}>
                        <Grid item xs={12} >
                            <Typography >
                                Claim Number: {claim.number}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} >
                            <InputLabel id="category">Category</InputLabel>
                            <Select
                                labelId="lbl-category"
                                id="lbl-category-id"
                                value={claim.type}
                                label="Category"
                                required
                                disabled={canApprove()}
                                fullWidth
                                onChange={(e) => onCategorySelect(e)}
                            >
                                <MenuItem value='' selected>Select</MenuItem>
                                <MenuItem value={'CCT'}>Travel</MenuItem>
                                <MenuItem value={'CCE'}>Entertainment</MenuItem>
                                <MenuItem value={'CCP'} >Procurement</MenuItem>
                            </Select >
                        </Grid>
                        <Grid item xs={12} >
                            <InputLabel id="sub-category">Sub Category</InputLabel>
                            <Select
                                labelId="lbl-sub-category"
                                id="lbl-sub-category-id"
                                value={claim.subType}
                                label="Sub Category"
                                onChange={(e) => { setClaim({ ...claim, subType: e.target.value }) }}
                                required
                                disabled={canApprove()}
                                fullWidth
                            >
                                {generateSubCat()}
                            </Select >
                        </Grid>
                        <Grid item xs={12} >
                            <TextField
                                required
                                id="claim.amount"
                                name="amount"
                                label="Claim Amount"
                                value={claim.amount}
                                fullWidth
                                variant="outlined"
                                disabled={canApprove()}

                                onChange={(e) => { setClaim({ ...claim, amount: parseInt(e.target.value) }) }}
                            />
                        </Grid>
                        <Grid item xs={12} >
                            <Typography >
                                Status: {claim.status}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} >
                            <Typography >
                                Generated On: {claim.generatedOn}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} >
                            <Typography >
                                Claimed By: {claim.owner.firstName}
                            </Typography>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Button onClick={() => callUpdateClaim()}>Update</Button>
                        </Grid>
                        <Grid item xs={12} md={6} onClick={() => gotoDashboard()}>
                            <Button>Cancel</Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Container >
        </>
    )
}