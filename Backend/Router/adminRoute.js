const express = require('express');
const router = express.Router();
const AdminController = require('../Controller/AdminController');

router.post('/login', AdminController.loginAdmin);
router.post('/setup-admin', AdminController.registerAdmin);

module.exports = router;
