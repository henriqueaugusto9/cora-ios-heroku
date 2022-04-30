const User = require('../models/user');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth.json')

module.exports = (requiredRole) => async (req, res, next) => {
    if (!req.userId) {
        res.status(401).send('Unauthorized')
        return next('Unauthorized');
    }

    const user = await User.findById(req.userId);

    if (!user || !user.roles.includes(requiredRole)) {
        res.status(401).send('Unauthorized')
        return next('Unauthorized');
    }

    req.user = {
        name: user.name,
        email: user.email
    }

    return next();
}