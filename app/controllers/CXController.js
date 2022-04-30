const express = require('express');
const CX = require('../models/CX');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const cxers = await CX.find();

        return res.status(200).send({ cxers })
        
    } catch (err) {
        log.error(err)
        return res.status(400).send("Error loading cxers")
    }
})

router.get('/:userId', async (req, res) => {
    try {
        const cxer = await CX.findById(req.params.userId);

        return res.status(200).send({ cxer })
        
    } catch (err) {
        log.error(err)
        return res.status(400).send("Error loading cxer by id");
    }
})

router.post('/', async (req, res) => {
    const { email } = req.body;

    try {
        if (await CX.findOne({ email })) {
            return res.status(400).send('cxer already exists');
        }

        const cxer = await CX.create(req.body)
        return res.status(201).send({ cxer });
    } catch (e) {
        log.error(e)
        return res.status(400).send('Error registration failed')
    }
    
})

router.put('/:userId', async (req, res) => {

    try {
        const cxer = await CX.findByIdAndUpdate(req.params.userId, req.body, { new: true });

        return res.status(200).send({ cxer });
    } catch (err) {
        log.error(err)
        return res.status(400).send('Error updating cxer');
    }
})

router.delete('/:userId', async (req, res) => {
    try {
        const cxer = await CX.findByIdAndDelete(req.params.userId);
        return res.send(204).send();
        
    } catch (err) {
        log.error(err)
        return res.status(400).send('Error deleting cxer');
    }
})

module.exports = app => app.use('/api/cx', router)