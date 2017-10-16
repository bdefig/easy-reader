const express = require('express');
const bodyParser = require('body-parser');

// Routes
const textRouter = require('./routes/TextRouter');

const app = express();

const mongoose = require('mongoose');
const devDbUrl = 'mongodb://localhost:27017/EasyReaderMongoose';
const dbURL = process.env.MONGODB_URI || devDbUrl;

mongoose.Promise = Promise;
mongoose.connect(dbURL, {useMongoClient: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());

app.use('/', textRouter);

module.exports = app;