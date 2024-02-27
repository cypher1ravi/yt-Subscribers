
const express = require('express');
const Subscribers = require('./models/subscribers');
const documentation = require('./swagger');
const app = express()

app.get('/subscriber', async (req, res) => {
    try {
        const subscribers = await Subscribers.find()
        res.json(subscribers)
    } catch (error) {
        res.sendStatus(500).json({ message: error.message })
    }
});
app.get('/subscriber/name', async (req, res) => {
    try {
        const subscribers = await Subscribers.find({}, { name: 1, subscribedChannel: 1, _id: 0 })
        res.json(subscribers)
    } catch (error) {
        res.send(500).json({ message: error.message })
    }
});
app.get('/subscriber/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const subscriber = await Subscribers.findById(id);
        if (!subscriber) {
            return res.status(400).json({ message: 'Subscriber not found' });
        }
        res.json(subscriber);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

});
app.use('/', documentation);


module.exports = app;
