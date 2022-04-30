const express = require('express');
const BRANDING = require('../models/branding');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const branders = await BRANDING.find();

        return res.status(200).send({ branders })
        
    } catch (err) {
        log.error(err)
        return res.status(400).send("Error loading branders")
    }
})

router.get('/:userId', async (req, res) => {
    try {
        const brander = await BRANDING.findById(req.params.userId);

        return res.status(200).send({ brander })
        
    } catch (err) {
        log.error(err)
        return res.status(400).send("Error loading brander by id");
    }
})

router.post('/', async (req, res) => {
    const { email } = req.body;

    try {
        if (await BRANDING.findOne({ email })) {
            return res.status(400).send('User already exists');
        }

        const brander = await BRANDING.create(req.body)
        return res.status(201).send({ brander });
    } catch (e) {
        log.error(e)
        return res.status(400).send('Error registration failed')
    }
    
})

router.put('/:userId', async (req, res) => {

    try {
        const brander = await BRANDING.findByIdAndUpdate(req.params.userId, req.body, { new: true });

        return res.status(200).send({ brander });
    } catch (err) {
        log.error(err)
        return res.status(400).send('Error updating brander');
    }
})

router.delete('/:userId', async (req, res) => {
    try {
        const brander = await BRANDING.findByIdAndDelete(req.params.userId);
        return res.send(204).send();
        
    } catch (err) {
        log.error(err)
        return res.status(400).send('Error deleting brander');
    }
})

module.exports = app => app.use('/api/branding', router)