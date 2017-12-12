const AuthenticationHelper = require('../helpers/AuthenticationHelper');
const User = require('../models/User');
const UserDocumentProgress = require('../models/UserDocumentProgress');

exports.createUser = function (req, res, next) {
    AuthenticationHelper.hashPassword(req.body.password)
    .then(hash => {
        return newUserInfo = {
            name: req.body.name,
            email: req.body.email,
            passwordHash: hash
        };
    })
    .then(newUserInfo => {
        console.log(JSON.stringify(newUserInfo));
        const newUser = new User(newUserInfo);
        return newUser.save()
        .catch(err => {return Promise.reject(err)});
    })
    .then(newUserSaved => {
        const token = AuthenticationHelper.generateToken(newUserSaved._id);
        console.log('New user saved');
        res.send({
            success: true,
            userID: newUserSaved._id,
            name: req.body.name,
            token: token
        });
    })
    .catch(err => {
        if (err.code && err.code === 11000) {
            console.log('Error: Email already exists');
        } else {
            console.log('Error with Create User process: ' + err);
        }
        res.send({
            success: false,
            message: 'Email is already registered'
        });
    });
}

exports.login = function (req, res, next) {
    const passwordSubmitted = req.body.password;
    let loginSuccess = false;
    let userID = '';
    let name = '';
    console.log('User to try to authenticate: ' + JSON.stringify(req.body));

    User.findOne({
        email: req.body.email
    })
    .then(userFound => {
        console.log('Looked for: ' + req.body.email);
        console.log(userFound);
        if (userFound) {
            console.log('User found by email');
            userID = userFound._id;     // This might not work
            name = userFound.name;
            console.log('Checking password: ' + req.body.password);
            return AuthenticationHelper.checkPassword(passwordSubmitted, userFound.passwordHash);
        } else {
            console.log('User not found by email');
            throw 'Caught: User not found by email';
        }
    })
    .then(wasSuccess => {
        if (wasSuccess) {
            console.log('Creating token with userID: ' + userID);
            return AuthenticationHelper.generateToken(userID)
        } else {
            throw 'Caught: It wasn\'t a success';
        }
    })
    .then(token => {
        console.log('Login success: ' + userID);
        res.json({
            success: true,
            userID: userID,
            name: name,
            token: token
        });
    })
    .catch(err => {
        console.log('Login error: ' + err);
        res.json({
            success: false,
            message: 'Incorrect email or password'
        });
    })
}

exports.getUserDocumentProgressByUserID = function (req, res, next) {
    UserDocumentProgress.find({
        user: req.params.userID
    }, null, {sort: {lastAccessed: -1}})
    .populate('document')
    .exec()
    .then(documentProgress => {
        res.send(documentProgress);
    })
    .catch(err => console.log(err));
}

exports.updateUserDocumentProgress = function (req, res, next) {
    UserDocumentProgress.findOneAndUpdate({
        user: req.params.userID,
        document: req.params.documentID
    }, {
        currentBlock: req.body.currentBlock,
        lastAccessed: Date.now()
    }, {upsert: true})
    .then(onUpdatedProgress => {
        res.json({Success: 'Document progress updated'});
    })
    .catch(err => console.log(err));
}