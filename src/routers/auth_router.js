const express = require('express');
const router = express.Router();
const { searchUser, register, getAllUsers, getUserById, login } = require('../controllers/auth_controller.js');

router.get('/getAllUsers', getAllUsers);
router.get('/getUser/:id', getUserById)
router.get('/searchUser', searchUser);
router.post('/register', register);
router.post('/login', login);



module.exports = router;