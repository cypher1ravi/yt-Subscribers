const express = require('express')
const app = require('./app.js')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const port = process.env.PORT || 3001
const DATABASE_URL = process.env.MONGODB_URI;

// Parse JSON bodies (as sent by API clients)
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

// Connect to DATABASE
mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection
db.on('error', (err) => console.log(err))
db.once('open', () => console.log('connected to database'))

// Start Server
app.listen(port, () => console.log(`App listening on port ${port}!`))