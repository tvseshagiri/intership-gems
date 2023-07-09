const { User, Claim } = require('../models')


async function getClaims(email) {

    const user = await User.findOne({ email: email })
        .populate({
            path: 'claims',
            populate: { path: 'owner', select: 'firstName lastName email' }
        }).exec()
    return user ? user.claims : []
}

async function saveClaim(claim, ownerEMail) {

    const user = await User.findOne({ email: ownerEMail }).exec()
    claim.owner = user._id;
    claim = await new Claim(claim).save()
    user.claims.push(claim._id)
    await user.save();
}



async function deleteClaim(claimId, userEmail) {

    await Claim.findById(claimId).deleteOne().exec()
    const user = await User.findOne({ email: userEmail }).exec()
    let claimIndex = user.claims.indexOf(claimId)
    delete user.claims[claimIndex]
    await user.save()
}

async function getClaimById(claimId) {

    const claim = Claim.findById(claimId).populate({ path: 'owner', select: 'firstName lastName email' }).exec()
    //console.log('Claim:' + JSON.stringify(claim))
    return claim;

}

async function getUnsettledClaimsByDivision(division, currentUserEmail) {
    console.log(`Getting unsettled Claims for divison ${division} `);

    let statuses = ['Generated', 'On-Hold']
    let users = await User.find({ division: division }).
        where('email').ne(currentUserEmail).
        populate({ path: 'claims', populate: { path: 'owner', select: 'firstName lastName email' } }).exec()
    let claims = []
    for (let user of users) {
        claims = claims.concat(user.claims)
    }
    //claims = claims.filter(claim => statuses.includes(claim.status))  // we need to include this condition in mongoose query itself

    return claims;

}

async function updateClaim(claim) {

    console.log(`Got Claim data as: ${JSON.stringify(claim)}`)

    let claimDoc = await Claim.findById(claim._id).exec()
    if (claimDoc) {

        if (claimDoc.status != claim.status) {
            claimDoc.status = claim.status;
        }
        if (claimDoc.type != claim.type) {
            claimDoc.type = claim.type;
        }
        if (claimDoc.subType != claim.subType) {
            claimDoc.subType = claim.subType;
        }
        if (claimDoc.amount != claim.amount) {
            claimDoc.amount = claim.amount;
        }
        await claimDoc.save()
    } else {
        throw Error('No Claim with the specified ID')
    }
}

async function updateClaimForApprover(claim, approverEmail) {

    let claimDoc = await Claim.findById(claim._id).exec()
    if (claimDoc) {

        if (claimDoc.status != claim.status) {
            claimDoc.status = claim.status;
        }
        if (['Approved', 'Rejected'].includes(claimDoc.status)) {
            claimDoc.approvedBy = approverEmail;
            claimDoc.approvedOn = Date.now()
        }
        if (claim.comments) {
            claimDoc.comments = claim.comments;
        }
        await claimDoc.save()
    } else {
        throw Error('No Claim with the specified ID')
    }
}

module.exports = {
    getClaims,
    saveClaim,
    deleteClaim,
    getClaimById,
    getUnsettledClaimsByDivision,
    updateClaim,
    updateClaimForApprover
}