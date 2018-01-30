const express = require('express');
const router = express.Router();
const LoginController = require('../controllers/LoginController');

// POST create new user
router.post('/v0/createUser', LoginController.createUser);

// POST login
router.post('/v0/login', LoginController.login);

module.exports = router;