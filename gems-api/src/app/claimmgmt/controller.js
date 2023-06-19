const service = require('./service')

function getClaims(req, res, next) {

    console.log('Claims for User:' + JSON.stringify(req.user))

    try {
        const claims = service.getClaims();
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