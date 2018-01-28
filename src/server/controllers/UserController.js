const DocumentMetadata = require('../models/DocumentMetadata');
const UserDocumentProgress = require('../models/UserDocumentProgress');

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

exports.getMoreDocuments = function (req, res, next) {
    const titleGreaterThan = req.query.titleGreaterThan;

    DocumentMetadata.find({title: {$gt: titleGreaterThan}}, null, {sort: {title: 1}})
    .limit(10)
    .exec()
    .then(docs => {
        res.send(docs);
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
    }, {upsert: true, new: true})
    .populate('document')
    .then(onUpdatedProgress => {
        res.json(onUpdatedProgress);
    })
    .catch(err => console.log(err));
}

exports.removeOneDocumentProgress = function (req, res, next) {
    UserDocumentProgress.remove({
        user: req.params.userID,
        document: req.params.documentID
    })
    .then(onRemoved => {
        res.json({
            success: true
        });
    })
    .catch(err => {
        console.log('Login error: ' + err);
        res.json({
            success: false,
            message: 'Document not removed from user document progress'
        });
    })
}