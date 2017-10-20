const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const cookieParser = require('cookie-parser');
const cors = require('cors');

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

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(expressValidator());
app.use(cookieParser());

app.use(cors());

app.use('/', textRouter);

app.listen(3001, () => {
    console.log('Server listening on port 3001')
});

module.exports = app;