const express = require('express');
const IOS = require('../models/iosers');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const iosers = await IOS.find();

        return res.status(200).send({ iosers })
        
    } catch (err) {
        log.error(err)
        return res.status(400).send("Error loading iosers")
    }
})

router.get('/:userId', async (req, res) => {
    try {
        const ioser = await IOS.findById(req.params.userId);

        return res.status(200).send({ ioser })
        
    } catch (err) {
        log.error(err)
        return res.status(400).send("Error loading ioser by id");
    }
})

router.post('/', async (req, res) => {
    const { email } = req.body;

    try {
        if (await IOS.findOne({ email })) {
            return res.status(400).send('Ioser already exists');
        }

        const ioser = await IOS.create(req.body)
        return res.status(201).send({ ioser });
    } catch (e) {
        log.error(e)
        return res.status(400).send('Error registration failed')
    }
    
})

router.put('/:userId', async (req, res) => {

    try {
        const ioser = await IOS.findByIdAndUpdate(req.params.userId, req.body, { new: true });

        return res.status(200).send({ ioser });
    } catch (err) {
        log.error(err)
        return res.status(400).send('Error updating ioser');
    }
})

router.delete('/:userId', async (req, res) => {
    try {
        const ioser = await IOS.findByIdAndDelete(req.params.userId);
        return res.send(204).send();
        
    } catch (err) {
        log.error(err)
        return res.status(400).send('Error deleting ioser');
    }
})

module.exports = app => app.use('/api/ios', router)