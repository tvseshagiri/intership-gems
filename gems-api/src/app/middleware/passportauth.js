const passport = require('passport');
const { User } = require('../usermgmt/UserModel');
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

function preparePassport() {
    var opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = process.env.TOKEN_SECRET;

    passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
        const user = User.findOne(jwt_payload.email)
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