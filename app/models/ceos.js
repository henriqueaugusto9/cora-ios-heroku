const mongoose = require('../../database/index');

const CEOSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    age: {
        type: String,
        required: true,
        select: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const CEO = mongoose.model('CEO', CEOSchema);

module.exports = CEO;