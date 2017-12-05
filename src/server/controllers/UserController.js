const AuthenticationHelper = require('../helpers/AuthenticationHelper');
const User = require('../models/User');
const UserDocumentProgress = require('../models/UserDocumentProgress');

exports.createUser = function (req, res, next) {
    const newUserRequest = new User ({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    AuthenticationHelper.hashPassword(newUserRequest.password)
    .then(hash => {
        const userToStore = new User({
            
        })
    })

    newUser.save()
    .then(onNewUserSaved => res.send({Success: 'New user saved'}))
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