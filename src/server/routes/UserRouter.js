const express = require('express');
const router = express.Router();

const userController = require('../controllers/UserController');

// POST create new user
router.post('/v0/createUser', userController.createUser);

// POST login
router.post('/v0/login', userController.login);

// GET all document progress by user ID
router.get('/v0/user/:userID/getDocumentProgress', userController.getUserDocumentProgressByUserID);

// GET more documents
router.get('/v0/user/:userID/getMoreDocuments', userController.getMoreDocuments);

// PUT update document progress
router.put('/v0/user/:userID/updateDocumentProgress/document/:documentID', userController.updateUserDocumentProgress);

// GET remove library user document
router.get('/v0/user/:userID/removeOneDocumentProgress/:documentID', userController.removeOneDocumentProgress);

module.exports = router;