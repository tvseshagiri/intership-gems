const service = require('./service')

async function getClaims(req, res, next) {

    try {
        const claims = await service.getClaims(req.user.email);
        res.json(claims);

    } catch (err) {
        console.error('Error while getting claims from service', err.message);
        next(err);
    }
}

async function saveClaim(req, res, next) {

    try {
        const claim = req.body;
        claim.ownerEmail = req.user.email;
        claim.status = 'Generated';
        // we need to write better login for generating claim number
        claim.number = 'CLM-' + (Math.random() + 1).toString(36).substring(2).toUpperCase();
        claim.generatedOn = new Date();
        await service.saveClaim(claim);
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

module.exports = {
    getClaims,
    saveClaim,
    deleteClaim
}