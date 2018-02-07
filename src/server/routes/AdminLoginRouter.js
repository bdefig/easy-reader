const express = require('express');
const router = express.Router();
const AdminLoginController = require('../controllers/AdminLoginController');

// POST create new admin
router.post('/v0/admin/createAdmin', AdminLoginController.createAdmin);

// POST login
router.post('/v0/admin/login', AdminLoginController.login);

module.exports = router;