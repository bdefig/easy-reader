const AuthenticationHelper = require('../helpers/AuthenticationHelper');
const User = require('../models/User');
const UserDocumentProgress = require('../models/UserDocumentProgress');

exports.createUser = function (req, res, next) {
    AuthenticationHelper.hashPassword(req.body.password)
    .then(hash => {
        return newUser = new User({
            name: req.body.name,
            email: req.body.email,
            passwordHash: hash
        });
        return newUser;
    })
    .then(newUser => {
        console.log('Saving new user ' + newUser.name);
        newUser.save();
    })
    .then(onNewUserSaved => {
        console.log('New user saved');
        res.send({success: 'New user saved'});
    })
    .catch(err => console.log(err));
}

exports.login = function (req, res, next) {
    const passwordSubmitted = req.body.password;
    let loginSuccess = false;
    let userID = '';

    User.findOne({
        email: req.body.email
    })
    .then(userFound => {
        console.log('Looked for: ' + req.body.email);
        console.log(userFound);
        if (userFound) {
            console.log('User found by email');
            userID = userFound._id;     // This might not work
            console.log('Checking password: ' + req.body.password);
            return AuthenticationHelper.checkPassword(passwordSubmitted, userFound.passwordHash);
        } else {
            console.log('User not found by email');
            // return new Error('User not found by email');
            throw 'Caught: User not found by email';
        }
    })
    .then(wasSuccess => {
        if (wasSuccess) {
            console.log('Creating token with userID: ' + userID);
            return AuthenticationHelper.generateToken(userID)
        } else {
            // return new Error('Login failed');
            throw 'Caught: It wasn\'t a success';
        }
    })
    .then(token => {
        console.log('Login success: ' + userID);
        res.json({
            success: true,
            token: token
        });
    })
    .catch(err => {
        console.log('Login error');
        res.json({ success: false });
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