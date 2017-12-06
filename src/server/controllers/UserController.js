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