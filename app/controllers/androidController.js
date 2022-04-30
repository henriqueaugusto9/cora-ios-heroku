const express = require('express');
const ANDROID = require('../models/androiders');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const androiders = await ANDROID.find();

        return res.status(200).send({ androiders })
        
    } catch (err) {
        log.error(err)
        return res.status(400).send("Error loading androiders")
    }
})

router.get('/:userId', async (req, res) => {
    try {
        const androiders = await ANDROID.findById(req.params.userId);

        return res.status(200).send({ androiders })
        
    } catch (err) {
        log.error(err)
        return res.status(400).send("Error loading androiders by id");
    }
})

router.post('/', async (req, res) => {
    const { email } = req.body;

    try {
        if (await IOS.findOne({ email })) {
            return res.status(400).send('androider already exists');
        }

        const androiders = await ANDROID.create(req.body)
        return res.status(201).send({ androiders });
    } catch (e) {
        log.error(e)
        return res.status(400).send('Error registration failed')
    }
    
})

router.put('/:userId', async (req, res) => {

    try {
        const androiders = await ANDROID.findByIdAndUpdate(req.params.userId, req.body, { new: true });

        return res.status(200).send({ androiders });
    } catch (err) {
        log.error(err)
        return res.status(400).send('Error updating androiders');
    }
})

router.delete('/:userId', async (req, res) => {
    try {
        const androiders = await ANDROID.findByIdAndDelete(req.params.userId);
        return res.send(204).send();
        
    } catch (err) {
        log.error(err)
        return res.status(400).send('Error deleting androiders');
    }
})

module.exports = app => app.use('/api/android', router)