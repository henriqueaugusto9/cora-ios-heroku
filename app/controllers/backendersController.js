const express = require('express');
const BACKEND = require('../models/backenders');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const backenders = await BACKEND.find();

        return res.status(200).send({ backenders })
        
    } catch (err) {
        log.error(err)
        return res.status(400).send("Error loading backenders")
    }
})

router.get('/:userId', async (req, res) => {
    try {
        const backender = await BACKEND.findById(req.params.userId);

        return res.status(200).send({ backender })
        
    } catch (err) {
        log.error(err)
        return res.status(400).send("Error loading backender by id");
    }
})

router.post('/', async (req, res) => {
    const { email } = req.body;

    try {
        if (await IOS.findOne({ email })) {
            return res.status(400).send('backender already exists');
        }

        const backender = await BACKEND.create(req.body)
        return res.status(201).send({ backender });
    } catch (e) {
        log.error(e)
        return res.status(400).send('Error registration failed')
    }
    
})

router.put('/:userId', async (req, res) => {

    try {
        const backender = await BACKEND.findByIdAndUpdate(req.params.userId, req.body, { new: true });

        return res.status(200).send({ backender });
    } catch (err) {
        log.error(err)
        return res.status(400).send('Error updating backender');
    }
})

router.delete('/:userId', async (req, res) => {
    try {
        const backender = await BACKEND.findByIdAndDelete(req.params.userId);
        return res.send(204).send();
        
    } catch (err) {
        log.error(err)
        return res.status(400).send('Error deleting backender');
    }
})

module.exports = app => app.use('/api/backend', router)