const DocumentBlock = require('../models/DocumentBlock');
const DocumentMetadata = require('../models/DocumentMetadata');

exports.getAllDocumentMetadata = function (req, res, next) {
    DocumentMetadata.find({})
        .then(docs => {
            res.send(docs);
        })
        .catch(err => console.log(err));
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
    DocumentBlock.findOne({
            documentID: req.params.documentID,
            index: req.params.blockIndex
        })
        .then(block => {
            res.json(block);
        })
        .catch(err => console.log(err));
}

exports.getDocumentBlocks = function (req, res, next) {
    DocumentBlock.find({
            documentID: req.params.documentID,
            index: { $gte : req.params.firstBlockIndex, $lte : req.params.lastBlockIndex }
        })
        .then(blocks => {
            res.send(blocks)
        })
        .catch(err => console.log(err));
}

exports.insertDocumentBlocks = function (req, res, next) {
    let blockArray = [];
    for (let block of req.body.blocks) {
        const newDocBlock = new DocumentBlock ({
            documentID: block.documentID,
            index: block.index,
            text: block.text,
            textType: block.textType,
            wordCount: block.wordCount
        })
        blockArray.push(newDocBlock);
    }
    let bulk = DocumentBlock.collection.initializeUnorderedBulkOp();
    for (let block of blockArray) {
        bulk.insert(block);
    }
    bulk.execute()
        .then(onInsertedBlocks => res.json({Success: 'Document blocks inserted'}))
        .catch(err => console.log(err));
}

exports.deleteDocumentByID = function (req, res, next) {
    DocumentMetadata.findByIdAndRemove(req.params.documentID)
        .then(deletedMetadata => {
            DocumentBlock.deleteMany({
                documentID: req.params.documentID
            })
        })
        .then(deletedBlocks => res.json({Success: 'Document metadata and blocks removed'}))
        .catch(err => console.log(err));
}

exports.clearAllDocuments = function (req, res, next) {
    DocumentMetadata.deleteMany({})
        .then(res.json({Success: 'Document metadata cleared'}))
        .catch(err => console.log(err));
}

exports.marcoPolo = function (req, res, next) {
    console.log('Logging here');
    console.log(req.params.marco);
    res.json({Polo: req.params.marco});
}