// const MongoClient = require('mongodb').MongoClient;
const mongoURL = 'mongodb://localhost:27017/EasyReader';
const mongoose = require('mongoose');

mongoose.connect(mongoURL, {useMongoClient: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));