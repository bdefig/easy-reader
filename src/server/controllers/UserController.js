const UserDocumentProgress = require('../models/UserDocumentProgress');

exports.getUserDocumentProgressByUserID = function (req, res, next) {
    UserDocumentProgress.find({
        userID: req.body.userID
    }, null, {sort: {lastAccessed: 1}}).exec()
        // TODO: Populate with document metadata
        .then(documentProgress => {
            res.send(documentProgress);
        })
        .catch(err => console.log(err));
}