const express = require('express');
const router = express.Router();

const textController = require('../controllers/TextController');

// GET all document metadata
router.get('/v1/documentMetadata', textController.getAllDocumentMetadata);

// GET document metadata by ID
router.get('/v1/documentMetadata/:documentID', textController.getDocumentMetadataByID);

// POST document metadata
router.post('/v1/documentMetadata/insert', textController.insertDocumentMetadata);

// GET single document block
router.get('/v1/document/:documentID/block/:blockIndex', textController.getOneDocumentBlock);

// GET multiple document blocks
router.get('/v1/document/:documentID/first/:firstBlockIndex/last/:lastBlockIndex', textController.getDocumentBlocks);

// POST document blocks
router.post('/v1/document/:documentID/insert', textController.insertDocumentBlocks);

// DELETE document
router.delete('/v1/document/:documentID/delete', textController.deleteDocumentByID);

// DELETE all documents and document blocks
router.delete('/v1/clearAllDocuments', textController.clearAllDocuments);

// GET for texting
router.get('/v1/marcoPolo/:marco', textController.marcoPolo);

module.exports = router;