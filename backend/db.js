const mongoose = require('mongoose')
const mongoURI = "mongodb://127.0.0.1:27017/Beproject";


const connecttomongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('Connected to MongoDB  database');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
};

module.exports = connecttomongo;