const jwt = require('jsonwebtoken')
const service = require('./service')

function generateAccessToken(userInfo) {
    return jwt.sign(userInfo, process.env.TOKEN_SECRET, { expiresIn: '1h' });
}

async function login(req, res, next) {

    const { username, password } = req.body;

    try {
        const user = await service.validateUser(username, password);
        if (user) {
            res.json({ user, token: generateAccessToken(user) })
        } else {
            res.status(401).json({ message: 'Invalid Credentials' });
        }
    } catch (e) {
        console.error('Error while validating user' + e.message);
        res.status(500).send('Error while processing request')
    }


}


module.exports = {
    login
}
