const Payment = require('../models/payment');
const log = require('../../helpers/log');

module.exports = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader) return res.status(401).send('No token provided');

    const payment = await Payment.find({ user: req.userId })
    if (payment.length != 0) {
        var paymentParts = payment[0].expiresDate.split("/");
        const ownerExpiresDate = new Date(+paymentParts[2], paymentParts[1] - 1, +paymentParts[0]);

        const today = new Date();
        if (ownerExpiresDate < today) {
            log.ok(`Assinatura expirada ${ownerExpiresDate}`)
            return res.status(403).send({ error: 'Assinatura expirada.' });
        } else {
            log.ok(`Assinatura valida ${ownerExpiresDate}`)
        }
        next()
    } else {
        return res.status(403).send({ error: 'Usuario sem assinatura' });
    }
}