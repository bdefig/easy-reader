const express = require('express');
const router = express.Router();
const AdminDocumentController = require('../controllers/AdminDocumentController');

// POST document (metadata and blocks)
router.post('/v0/admin/document/insert', AdminDocumentController.insertDocument);

module.exports = router;