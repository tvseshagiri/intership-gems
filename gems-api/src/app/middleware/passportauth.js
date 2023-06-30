const passport = require('passport');
const { User } = require('../models');
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

async function preparePassport() {
    var opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = process.env.TOKEN_SECRET;

    passport.use(new JwtStrategy(opts, async function (jwt_payload, done) {
        const user = await User.findOne({ email: jwt_payload.email }).select("firstName lastName email role division").exec()
        if (user) {
            return done(null, user)
        } else {
            return done(new Error("Invalid User"), false)
        }
    }))

}

module.exports = {
    preparePassport
}