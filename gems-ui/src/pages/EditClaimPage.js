import { Container, Paper, InputLabel, MenuItem, Select, Typography, Grid, TextField, Button } from "@mui/material"
import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { userInfoSelector } from "../reducers/loginSlice";
import { useDispatch, useSelector } from "react-redux";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { updateClaim } from "../reducers/claimSlice";
import format from "date-fns/format";

export function EditClaimPage() {

    const [claim, setClaim] = useState(useLoaderData());
    const [comment, setComment] = useState('')
    const navigate = useNavigate();
    const userInfo = useSelector(userInfoSelector)
    const [type, setType] = useState();
    const dispatch = useDispatch()
    const [message, setMessage] = useState()

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

    function isApprovalMode() {
        return userInfo.role === 'BudgetOwner' &&
            userInfo.email != claim.owner.email
            ? true : false;
    }

    async function callUpdateClaim() {
        if (isApprovalMode() && comment.trim().length > 0) {
            let newComment = {
                comment: comment,
                on: new Date().toDateString(),
                by: userInfo.email
            };
            claim.comments ? claim.comments.push(newComment) : claim.comments = [newComment]

        }
        try {
            console.log('Gong to ')
            setMessage(null)
            await dispatch(updateClaim(claim)).unwrap()
            setComment('')
            gotoDashboard();
        } catch (err) {
            console.log(err)
            setMessage(`Error while Updating claim. ${err.message}`)
        }
    }

    function gotoDashboard() {
        navigate('/dashboard')
    }

    function getStatusSection() {
        let section;
        if (isApprovalMode()) {
            section = <>
                <Grid item xs={12} >
                    <Typography >
                        <InputLabel id="status">Status</InputLabel>
                        <Select
                            labelId="lbl-status"
                            id="lbl-status-id"
                            value={claim.status}
                            label="Status"
                            required
                            fullWidth
                            onChange={(e) => { setClaim({ ...claim, status: e.target.value }) }}
                        >
                            <MenuItem value={'Approved'}>Approved</MenuItem>
                            <MenuItem value={'Rejected'}>Rejected</MenuItem>
                            <MenuItem value={'On-Hold'} >On-Hold</MenuItem>
                        </Select >
                    </Typography>
                </Grid >
                <Grid item xs={12} >
                    <TextField
                        required
                        id="claim.comment"
                        name="comment"
                        label="comment"
                        value={comment}
                        fullWidth
                        variant="outlined"
                        onChange={(e) => { setComment(e.target.value) }}
                    />
                </Grid>
            </>
        } else {
            section = <Grid item xs={12} >
                <Typography >
                    Status: {claim.status}
                </Typography>
            </Grid>
        }
        return section;
    }

    function getCommentsSection() {
        if (claim.comments) {
            return <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="comments">
                    <TableHead>
                        <TableRow>
                            <TableCell>Comment</TableCell>
                            <TableCell align="right">By</TableCell>
                            <TableCell align="right">Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {claim.comments.map((c) => (
                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell>
                                    {c.comment}
                                </TableCell>
                                <TableCell>
                                    {c.by}
                                </TableCell>
                                <TableCell align="right">{format(Date(c.on), 'dd-MMM-yyy')}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        }
    }

    return (

        <>

            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <h2>Dashboard</h2>
                    {message}
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
                                disabled={isApprovalMode()}
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
                                disabled={isApprovalMode()}
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
                                type="number"
                                variant="outlined"
                                disabled={isApprovalMode()}

                                onChange={(e) => { setClaim({ ...claim, amount: parseInt(e.target.value) }) }}
                            />
                        </Grid>
                        {getStatusSection()}
                        <Grid item xs={12} >
                            <Typography >
                                Generated On: {format(new Date(claim.generatedOn), 'dd-MMM-yyy')}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} >
                            <Typography >
                                Claim Owner: {claim.owner.firstName}
                            </Typography>
                        </Grid>
                        {getCommentsSection()}
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