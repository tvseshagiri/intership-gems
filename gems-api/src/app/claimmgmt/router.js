const express = require('express')
const router = express.Router()
const cntrl = require('./controller')


router.get('/claims', cntrl.getClaims)
router.post('/claims', cntrl.saveClaim)
router.delete('/claims/:claimid', cntrl.deleteClaim)
router.get('/claims/:claimid', cntrl.getClaimById)
router.get('/unsettledclaims', cntrl.getUnsettledClaimsByDivision)
router.put('/claims/:claimid', cntrl.updateClaim)

module.exports = router
