const express = require('express');
const router = express.Router();
const { searchUser, register, getAllUsers, getUserById, login, deleteUser, changeRole } = require('../controllers/auth_controller.js');

router.get('/getAllUsers', getAllUsers);
router.get('/getUser/:id', getUserById)
router.get('/searchUser', searchUser);
router.post('/register', register);
router.post('/login', login);
router.delete('/deleteUser/:id', deleteUser);
router.post('/changeRole/:id', changeRole);



module.exports = router;