const { User } = require('../models')


async function getClaims(email) {

    const user = await User.findOne({ email: email }).exec()
    return user ? user.claims : []
}

async function saveClaim(claim) {
    console.log(`Claim to be saved is ${JSON.stringify(claim)}`)
    const user = await User.findOne({ email: claim.ownerEmail }).exec()
    user.claims.push(claim);
    await user.save();
}

async function deleteClaim(claimId, userEmail) {
    console.log(`Claim to be deleted is ${claimId}`)
    const user = await User.findOne({ email: userEmail }).exec()
    console.log(JSON.stringify(user.claims.id(claimId)))
    user.claims.id(claimId).deleteOne();
    await user.save()
}

module.exports = {
    getClaims,
    saveClaim,
    deleteClaim
}