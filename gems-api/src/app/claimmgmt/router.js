const express = require('express')
const router = express.Router()
const cntrl = require('./controller')


router.get('/claims', cntrl.getClaims)
router.post('/claims', cntrl.saveClaim)
router.delete('/claims/:claimid', cntrl.deleteClaim)

module.exports = router
