const mongoose = require('mongoose')
require('dotenv').config()

try {
    mongoose.connect(process.env.MONGODB_URL)
} catch (err) {
    console.error(`Unable to connect to mongodb: Error ${err.message}`)
}
const opts = { toJSON: { virtuals: true } };

const claimsSchema = new mongoose.Schema({
    number: String,
    type: {
        type: String,
        enum: ['CCT', 'CCE', 'CCP'],
        default: 'CCE',
        required: true
    },
    subType: {
        type: String,
        enum: ['DOM', 'INL', 'FOD', 'OUN', 'HRD', 'SFT'],
        default: 'FOD',
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
    owner: {
        type: mongoose.ObjectId,
        ref: 'User',
        index: true
    },
    approvedBy: String,
    approvedOn: Date,
    comments: [
        {
            comment: String,
            by: String,
            on: Date
        }
    ]


}, opts)
const typeDesc = {
    'CCT': 'Travel',
    'CCE': 'Entertainment',
    'CCP': 'Procurement',
    'DOM': 'Domestic',
    'INL': 'International',
    'FOD': 'Food',
    'OUN': 'Outing',
    'HRD': 'Hardware',
    'SFT': 'Software'
}
claimsSchema.virtual('typeDesc').get(function () {
    return typeDesc[this.type]
})
claimsSchema.virtual('subTypeDesc').get(function () {
    return typeDesc[this.subType]
})


const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
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
        type: [mongoose.ObjectId],
        ref: 'Claim'
    }
}, opts)

const User = mongoose.model('User', userSchema)
const Claim = mongoose.model('Claim', claimsSchema)

module.exports = {
    User,
    Claim
}