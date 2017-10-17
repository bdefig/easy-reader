const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const expressValidator = require('express-validator');
const cookieParser = require('cookie-parser');

// Routes
const textRouter = require('./routes/TextRouter');

const app = express();
// app.listen(3000);

app.use(helmet());

const mongoose = require('mongoose');
const devDbUrl = 'mongodb://localhost:27017/EasyReaderMongoose';
const dbURL = process.env.MONGODB_URI || devDbUrl;

mongoose.Promise = Promise;
mongoose.connect(dbURL, {useMongoClient: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());

app.use('/', textRouter);

app.listen(3000);

module.exports = app;