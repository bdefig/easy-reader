const express = require('express');
const router = express.Router();

const userController = require('../controllers/UserController');

// POST create new user
router.post('/v0/createUser', userController.createUser);

// GET all document progress by user ID
router.get('/v0/user/:userID/getDocumentProgress', userController.getUserDocumentProgressByUserID);

// PUT update document progress
router.put('/v0/user/:userID/updateDocumentProgress/document/:documentID', userController.updateUserDocumentProgress);

module.exports = router;