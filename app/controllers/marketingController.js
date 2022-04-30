const express = require('express');
const MARKETING = require('../models/marketing');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const marketers = await MARKETING.find();

        return res.status(200).send({ marketers })
        
    } catch (err) {
        log.error(err)
        return res.status(400).send("Error loading marketers")
    }
})

router.get('/:userId', async (req, res) => {
    try {
        const marketer = await MARKETING.findById(req.params.userId);

        return res.status(200).send({ marketer })
        
    } catch (err) {
        log.error(err)
        return res.status(400).send("Error loading marketer by id");
    }
})

router.post('/', async (req, res) => {
    const { email } = req.body;

    try {
        if (await MARKETING.findOne({ email })) {
            return res.status(400).send('marketer already exists');
        }

        const marketer = await MARKETING.create(req.body)
        return res.status(201).send({ marketer });
    } catch (e) {
        log.error(e)
        return res.status(400).send('Error registration failed')
    }
    
})

router.put('/:userId', async (req, res) => {

    try {
        const marketer = await MARKETING.findByIdAndUpdate(req.params.userId, req.body, { new: true });

        return res.status(200).send({ marketer });
    } catch (err) {
        log.error(err)
        return res.status(400).send('Error updating marketer');
    }
})

router.delete('/:userId', async (req, res) => {
    try {
        const marketer = await MARKETING.findByIdAndDelete(req.params.userId);
        return res.send(204).send();
        
    } catch (err) {
        log.error(err)
        return res.status(400).send('Error deleting marketer');
    }
})

module.exports = app => app.use('/api/marketing', router)