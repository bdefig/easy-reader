const express = require('express');
const router = express.Router();
const textController = require('../controllers/TextController');

// GET all document metadata
router.get('/v0/documentMetadata', textController.getAllDocumentMetadata);

// GET document metadata by ID
router.get('/v0/documentMetadata/:documentID', textController.getDocumentMetadataByID);

// POST document metadata
router.post('/v0/documentMetadata/insert', textController.insertDocumentMetadata);

// GET single document block
router.get('/v0/document/:documentID/block/:blockIndex', textController.getOneDocumentBlock);

// GET multiple document blocks
router.get('/v0/document/:documentID/first/:firstBlockIndex/last/:lastBlockIndex', textController.getDocumentBlocks);

// POST document blocks
router.post('/v0/document/:documentID/insert', textController.insertDocumentBlocks);

// POST document (metadata and blocks)
router.post('/v0/document/insert', textController.insertDocument);

// DELETE document
router.delete('/v0/document/:documentID/delete', textController.deleteDocumentByID);

// DELETE all documents and document blocks
router.delete('/v0/clearAllDocuments', textController.clearAllDocuments);

module.exports = router;