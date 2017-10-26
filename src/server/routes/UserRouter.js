const express = require('express');
const router = expres.Router();

const userController = require('../controllers/UserController');

// GET all document progress by user ID
router.get('/v1/user/getDocumentProgress/:userID', userController.getUserDocumentProgressByUserID);

module.exports = router;