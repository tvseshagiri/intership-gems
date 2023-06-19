
claims = [
    { claimID: 'CLM-TRL-4234342', claimBy: 'Seshagiri', amount: 4534.33, category: 'Travel', subCategory: 'domestic' },
    { claimID: 'CLM-ENT-4534342', claimBy: 'Vennela', amount: 7987.33, category: 'Entertainment', subCategory: 'Team Lunch' },
    { claimID: 'CLM-ENT-4335342', claimBy: 'Nanda', amount: 17987.33, category: 'Entertainment', subCategory: 'Team Lunch' },
]


function getClaims() {

    return claims;

}

function saveClaim(claim) {
    console.log(`Claim to be saved is ${claim}`)
    claims.push(claim);
}

module.exports = {
    getClaims,
    saveClaim
}