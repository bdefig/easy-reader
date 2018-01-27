// NPM Packages
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// Routes
const userRouter = require('./routes/UserRouter');
const textRouter = require('./routes/TextRouter');

// Set up server
const app = express();

// Configure server
const config = require('./Config');
const port = process.env.PORT || 8080;
app.set('authenticationSecret', config.secret);

// Set up the database and connect to it
const mongoose = require('mongoose');
const devDbUrl = 'mongodb://localhost:27017/EasyReaderMongoose';
const dbURL = process.env.MONGODB_URI || devDbUrl;

mongoose.Promise = Promise;
mongoose.connect(dbURL, {useMongoClient: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Set up middleware
app.use(helmet());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(expressValidator());
app.use(cookieParser());
app.use(cors());
app.use(morgan('dev'));

// Set up routers
app.use('/', userRouter);
app.use('/', textRouter);

// Start server
app.listen(port, () => {
    console.log('Server listening on port 8080')
});

module.exports = app;