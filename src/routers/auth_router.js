const express = require('express');
const router = express.Router();
const { searchUser, register, getAllUsers, getUserById, login, deleteUser, changeRole } = require('../controllers/auth_controller.js');
const auth = require('../middleware/auth.js');


router.get('/getAllUsers', auth, getAllUsers);
router.get('/getUser/:id', auth, getUserById)
router.get('/searchUser', auth, searchUser);
router.post('/register', register);
router.post('/login', login);
router.delete('/deleteUser/:id', deleteUser);       // sadece admin
router.post('/changeRole/:id', changeRole);        // sadece admin



module.exports = router;