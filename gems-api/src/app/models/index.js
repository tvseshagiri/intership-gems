const mongoose = require('mongoose')
require('dotenv').config()

try {
    mongoose.connect(process.env.MONGODB_URL)
} catch (err) {
    console.error(`Unable to connect to mongodb: Error ${err.message}`)
}


const claimsSchema = new mongoose.Schema({
    number: String,
    type: {
        type: String,
        enum: ['Travel', 'Entertainment', 'Procurement'],
        default: 'Entertainment',
        required: true
    },
    subType: {
        type: String,
        enum: ['Domestic', 'International', 'Food', 'Outing', 'Hardware', 'Software'],
        default: 'Food',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Approved', 'Generated', 'Rejected', 'On-Hold', 'Settled'],
        default: 'Generated'
    },
    generatedOn: Date,
    ownerEmail: String,
    approvedBy: String,
    approvedOn: Date
})


const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        index: true,
        unique: true
    },
    password: String,
    role: {
        type: String,
        enum: ['Admin', 'User', 'BudgetOwner'],
        default: 'User'
    },
    division: {
        type: String,
        enum: ['Sales', 'R&D', 'Sales', 'Marketing', 'CXO'],
        default: 'Sales'
    },
    claims: {
        type: [claimsSchema]
    }
})

const User = mongoose.model('User', userSchema)
const Claim = mongoose.model('Claim', userSchema)

module.exports = {
    User,
    Claim
}