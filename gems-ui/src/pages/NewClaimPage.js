import { Container, Paper, InputLabel, MenuItem, Select, Typography, Grid, TextField, Button } from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { saveClaim } from '../reducers/claimSlice'
import { useSelector, useDispatch } from "react-redux";


export function NewClaimPage() {

    const [claim, setClaim] = useState({
        type: null,
        subType: null,
        amount: null
    });
    const [type, setType] = useState();
    const navigate = useNavigate();
    const [message, setMessage] = useState()
    const dispatch = useDispatch()

    const subCategories = {
        'CCT': [['DOM', 'INL'], ['Domestic', 'International']],
        'CCE': [['FOD', 'OUN'], ['Food', 'Outing']],
        'CCP': [['HDW', 'SFT'], ['Hardware', 'Software']],
    }

    function onCategorySelect(e) {
        setClaim({ ...claim, type: e.target.value })
        setType(e.target.value)
    }

    function generateSubCat() {
        if (subCategories.hasOwnProperty(type)) {
            const options = subCategories[type][0].map((val, i) => {
                return <MenuItem value={val}>{subCategories[type][1][i]}</MenuItem>
            })
            return options;
        }
    }

    function gotoDashboard() {
        navigate('/dashboard')
    }

    async function createClaim() {
        try {
            console.log('Gong to ')
            setMessage(null)
            await dispatch(saveClaim(claim)).unwrap()
            gotoDashboard();
        } catch (err) {
            setMessage(`Error while creating claim. ${err.message}`)
        }


    }

    return (

        <>
            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <h2>New Claim</h2>
                    {message}
                    <Grid container spacing={3}>
                        <Grid item xs={12} >
                            <InputLabel id="category">Category</InputLabel>
                            <Select
                                labelId="lbl-category"
                                id="lbl-category-id"
                                value={claim.type}
                                label="Category"
                                required
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
                                fullWidth
                                variant="outlined"
                                onChange={(e) => { setClaim({ ...claim, amount: parseInt(e.target.value) }) }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Button onClick={() => createClaim()}>Create</Button>
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