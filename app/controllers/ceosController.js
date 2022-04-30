const express = require('express');
const CEO = require('../models/ceos');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const ceos = await CEO.find();

        return res.status(200).send({ ceos })
        
    } catch (err) {
        log.error(err)
        return res.status(400).send("Error loading ceos")
    }
})

router.get('/:userId', async (req, res) => {
    try {
        const ceo = await CEO.findById(req.params.userId);

        return res.status(200).send({ ceo })
        
    } catch (err) {
        log.error(err)
        return res.status(400).send("Error loading ceo by id");
    }
})

router.post('/', async (req, res) => {
    const { email } = req.body;

    try {
        if (await CEO.findOne({ email })) {
            return res.status(400).send('ceo already exists');
        }

        const ceo = await CEO.create(req.body)
        return res.status(201).send({ ceo });
    } catch (e) {
        log.error(e)
        return res.status(400).send('Error registration failed')
    }
    
})

router.put('/:userId', async (req, res) => {

    try {
        const ceo = await CEO.findByIdAndUpdate(req.params.userId, req.body, { new: true });

        return res.status(200).send({ ceo });
    } catch (err) {
        log.error(err)
        return res.status(400).send('Error updating ceo');
    }
})

router.delete('/:userId', async (req, res) => {
    try {
        const ceo = await CEO.findByIdAndDelete(req.params.userId);
        return res.send(204).send();
        
    } catch (err) {
        log.error(err)
        return res.status(400).send('Error deleting ceo');
    }
})

module.exports = app => app.use('/api/ceo', router)