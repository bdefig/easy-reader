const express = require('express');
const router = express.Router();
const LoginController = require('../controllers/LoginController');

// POST create new user
router.post('/v0/createUser', LoginController.createUser);

// POST login
router.post('/v0/login', LoginController.login);

// POST request new access token
router.post('/v0/requestNewAccessToken', LoginController.requestNewAccessToken)

module.exports = router;