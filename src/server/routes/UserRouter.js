const express = require('express');
const router = expres.Router();

const userController = require('../controllers/UserController');

// POST create new user
router.get('/v1/createUser', userController.createUser);

// GET all document progress by user ID
router.get('/v1/user/:userID/getDocumentProgress', userController.getUserDocumentProgressByUserID);

// PUT update document progress
router.put('/v1/user/:userID/updateDocumentProgress/document/:documentID', userController.updateUserDocumentProgress);

module.exports = router;