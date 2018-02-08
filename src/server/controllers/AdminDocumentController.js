const DocumentBlock = require('../models/DocumentBlock');
const DocumentMetadata = require('../models/DocumentMetadata');

exports.insertDocument = function (req, res, next) {
    if (!req.body.documentMetadata || !req.body.blocks) {
        res.json({
            success: false,
            message: 'Document metadata or blocks missing'
        });
        return;
    }
    const docMetadata = req.body.documentMetadata;
    const blocks = req.body.blocks;

    // TODO: Might want to delete old document with same title if it exists

    const newDocumentMetadata = new DocumentMetadata ({
        title: docMetadata.title,
        author: docMetadata.author,
        wordCountPerBlock: docMetadata.wordCountPerBlock
    });

    const documentID = newDocumentMetadata._id;

    let bulk = DocumentBlock.collection.initializeUnorderedBulkOp();
    for (let block of blocks) {
        block.document = documentID;
        bulk.insert(block);
    }

    return newDocumentMetadata.save()
    .then(metadataSaveResult => bulk.execute())
    .then(onBulkInsert => res.json({success: true}))
    .catch(err => console.log(err));
}