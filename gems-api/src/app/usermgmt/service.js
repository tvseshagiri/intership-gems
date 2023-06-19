const { User } = require('./UserModel')

function validateUser(email, password) {
    return User.validateUser(email, password);
}

module.exports = {
    validateUser
}