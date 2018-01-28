const express = require('express');
const router = express.Router();
const AuthenticationController = require('../controllers/AuthenticationController');

// POST create new user
router.post('/v0/createUser', AuthenticationController.createUser);

// POST login
router.post('/v0/login', AuthenticationController.login);

module.exports = router;