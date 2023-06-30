const { User } = require('../models/')

async function validateUser(email, password) {
    const user = await User.findOne({ email: email }).exec();

    if (user && user.password === password) {

        const { firstName, lastName, fullName, email, _id, role, division } = user
        const usr = { firstName, lastName, fullName, email, _id, role, division }

        return usr;
    }
}


module.exports = {
    validateUser
}