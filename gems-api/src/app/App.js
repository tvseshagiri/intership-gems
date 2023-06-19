const express = require('express')
const passport = require('passport');
require('dotenv').config()

const { preparePassport } = require('./middleware/passportauth');
const claimRutr = require('./claimmgmt/router')
const usrRutr = require('./usermgmt/router');

const app = express();
app.use(express.json())

// Test purpose
app.get('/', function (req, res) {
    res.send('Server is running...');
})

app.use('/', usrRutr)

preparePassport()

app.use('/api', passport.authenticate('jwt', { session: false }), [claimRutr]);

module.exports = app