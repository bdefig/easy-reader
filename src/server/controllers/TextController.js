const DocumentBlock = require('../models/DocumentBlock');
const DocumentMetadata = require('../models/DocumentMetadata');

exports.getAllDocumentMetadata = function (req, res, next) {

}

exports.getDocumentMetadataByID = function (req, res, next) {
    DocumentMetadata.findById(req.documentID)
        .then(doc => {
            res.json(doc);
        })
        .catch(err => console.log(err));
}

exports.insertDocumentMetadata = function (req, res, next) {
    const newDocMetadata = new DocumentMetadata ({
        title: req.body.title,
        author: req.body.author,
        wordCountPerBlock: req.body.wordCountPerBlock
    });
    
    // Add validation

    newDocMetadata.save()
        .catch(err => console.log(err));
}

exports.getOneDocumentBlock = function (req, res, next) {
    
}

exports.getDocumentBlocks = function (req, res, next) {
    
}

exports.insertDocumentBlocks = function (req, res, next) {
    
}

exports.deleteDocumentByID = function (req, res, next) {

}

exports.clearAllDocuments = function (req, res, next) {
    DocumentMetadata.deleteMany({})
        .catch(err => console.log(err));
}