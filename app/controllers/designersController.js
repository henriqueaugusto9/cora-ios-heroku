const express = require('express');
const DESIGNER = require('../models/designers');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const designers = await DESIGNER.find();

        return res.status(200).send({ designers })
        
    } catch (err) {
        log.error(err)
        return res.status(400).send("Error loading designers")
    }
})

router.get('/:userId', async (req, res) => {
    try {
        const designer = await DESIGNER.findById(req.params.userId);

        return res.status(200).send({ designer })
        
    } catch (err) {
        log.error(err)
        return res.status(400).send("Error loading designer by id");
    }
})

router.post('/', async (req, res) => {
    const { email } = req.body;

    try {
        if (await IOS.findOne({ email })) {
            return res.status(400).send('designer already exists');
        }

        const designer = await DESIGNER.create(req.body)
        return res.status(201).send({ designer });
    } catch (e) {
        log.error(e)
        return res.status(400).send('Error registration failed')
    }
    
})

router.put('/:userId', async (req, res) => {

    try {
        const designer = await DESIGNER.findByIdAndUpdate(req.params.userId, req.body, { new: true });

        return res.status(200).send({ designer });
    } catch (err) {
        log.error(err)
        return res.status(400).send('Error updating designer');
    }
})

router.delete('/:userId', async (req, res) => {
    try {
        const designer = await DESIGNER.findByIdAndDelete(req.params.userId);
        return res.send(204).send();
        
    } catch (err) {
        log.error(err)
        return res.status(400).send('Error deleting designer');
    }
})

module.exports = app => app.use('/api/design', router)