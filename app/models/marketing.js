const mongoose = require('../../database/index');

const MarketingSchema = new mongoose.Schema({
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

const Marketing = mongoose.model('Marketing', MarketingSchema);

module.exports = Marketing;