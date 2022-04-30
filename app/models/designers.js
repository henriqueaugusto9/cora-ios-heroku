const mongoose = require('../../database/index');

const DesignerSchema = new mongoose.Schema({
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

const Designer = mongoose.model('Designer', DesignerSchema);

module.exports = Designer;