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

function saveClaim(req, res, next) {

    try {
        const claim = req.body;
        service.saveClaim(claim);
        res.status(200)
        res.end()

    } catch (err) {
        console.error('Error while getting claims from service', err.message);
        next(err);
    }
}

module.exports = {
    getClaims,
    saveClaim
}