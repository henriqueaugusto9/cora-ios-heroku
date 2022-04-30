const express = require('express');
const TECHOPS = require('../models/techops');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const techopers = await TECHOPS.find();

        return res.status(200).send({ techopers })
        
    } catch (err) {
        log.error(err)
        return res.status(400).send("Error loading techopers")
    }
})

router.get('/:userId', async (req, res) => {
    try {
        const techoper = await TECHOPS.findById(req.params.userId);

        return res.status(200).send({ techoper })
        
    } catch (err) {
        log.error(err)
        return res.status(400).send("Error loading techoper by id");
    }
})

router.post('/', async (req, res) => {
    const { email } = req.body;

    try {
        if (await TECHOPS.findOne({ email })) {
            return res.status(400).send('techoper already exists');
        }

        const techoper = await TECHOPS.create(req.body)
        return res.status(201).send({ techoper });
    } catch (e) {
        log.error(e)
        return res.status(400).send('Error registration failed')
    }
    
})

router.put('/:userId', async (req, res) => {

    try {
        const techoper = await TECHOPS.findByIdAndUpdate(req.params.userId, req.body, { new: true });

        return res.status(200).send({ techoper });
    } catch (err) {
        log.error(err)
        return res.status(400).send('Error updating techoper');
    }
})

router.delete('/:userId', async (req, res) => {
    try {
        const techoper = await TECHOPS.findByIdAndDelete(req.params.userId);
        return res.send(204).send();
        
    } catch (err) {
        log.error(err)
        return res.status(400).send('Error deleting techoper');
    }
})

module.exports = app => app.use('/api/techops', router)