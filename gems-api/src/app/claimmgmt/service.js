const { User } = require('../models')


async function getClaims(email) {

    const user = await User.findOne({ email: email }).exec()
    return user ? user.claims : []
}

function saveClaim(claim) {
    console.log(`Claim to be saved is ${claim}`)
    claims.push(claim);
}

module.exports = {
    getClaims,
    saveClaim
}