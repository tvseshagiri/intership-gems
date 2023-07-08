const service = require('./service')

async function getClaims(req, res, next) {

    try {
        const claims = await service.getClaims(req.user.email);
        console.log(`Claims: ${claims.length}`)
        res.json(claims);

    } catch (err) {
        console.error('Error while getting claims from service', err.message);
        next(err);
    }
}

async function saveClaim(req, res, next) {

    try {
        const claim = req.body;
        claim.status = 'Generated';
        // we need to write better login for generating claim number
        claim.number = 'CLM-' + (Math.random() + 1).toString(36).substring(2).toUpperCase();
        claim.generatedOn = new Date();
        await service.saveClaim(claim, req.user.email);
        res.status(200)
        res.end()

    } catch (err) {
        console.error(`Error while creating claim: ${err.message}`);
        next(err);
    }
}

async function deleteClaim(req, res, next) {

    try {
        await service.deleteClaim(req.params['claimid'], req.user.email);
        res.status(200).end()

    } catch (err) {
        console.error('Error while deleting claim', err.message);
        next(err);
    }
}

async function getClaimById(req, res, next) {

    try {
        const claim = await service.getClaimById(req.params['claimid'], req.user.email);
        res.json(claim);

    } catch (err) {
        console.error('Error while getting claim', err.message);
        next(err);
    }
}

async function getUnsettledClaimsByDivision(req, res, next) {

    try {
        if (req.user.role === 'BudgetOwner') {
            const claim = await service.getUnsettledClaimsByDivision(req.user.division, req.user.email);
            res.json(claim);
        } else {
            res.status(403).send('Unauthorized to invoke this operation')
        }

    } catch (err) {
        console.error('Error while getting claim', err.message);
        next(err);
    }
}

module.exports = {
    getClaims,
    saveClaim,
    deleteClaim,
    getClaimById,
    getUnsettledClaimsByDivision
}