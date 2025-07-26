const express = require('express');
const router = express.Router();
const { register, getAllUsers, login } = require('../controllers/auth_controller.js');

router.get('/getAllUsers', getAllUsers);
router.post('/register', register);
router.post('/login', login);



module.exports = router;