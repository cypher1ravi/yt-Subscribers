const mongoose = require('mongoose');
const subscriberModel = require('./models/subscribers');
const data = require('./data');
const dotenv = require('dotenv')
dotenv.config()
const DATABASE_URL = process.env.MONGODB_URI;
mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected...');
    refreshAll();
});

const refreshAll = async () => {
    try {
        await subscriberModel.deleteMany({});
        await subscriberModel.insertMany(data);
        console.log('Data refreshed successfully.');
    } catch (error) {
        console.error('Error refreshing data:', error);
    } finally {
        mongoose.disconnect();
        console.log('Disconnected from database.');
    }
};
