_users = [
    {
        email: 'rama@gmail.com',
        password: 'abcdef',
        role: 'Admin'
    },
    {
        email: 'sita@gmail.com',
        password: 'udbdef',
        role: 'User'
    },
    {
        email: 'laxman@gmail.com',
        password: 'khedef',
        role: 'User'
    }
]

function User() { }

User.findOne = function (email) {

    for (user of _users) {
        if (user.email === email) {
            return user;
        }
    }
    return null;
}

User.validateUser = function (email, password) {

    for (user of _users) {
        if (user.email === email && user.password === password) {
            return user;
        }
    }
    return null;
}

module.exports = {
    User
}