const UserAccount = require('../models/UserAccount');
const UserDocumentProgress = require('../models/UserDocumentProgress');

exports.createUser = function (req, res, next) {
    const newUser = new UserAccount ({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    });

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