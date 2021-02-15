const express = require('express');
const router = express.Router();
const verify = require('../middleware/verifyToken');
const UserController = require('../controllers/user');

router.post('/register', UserController.registerNewUser);
router.post('/login', UserController.userLogin);
router.delete('/me', verify, UserController.deleteUser);
router.post('/logout', verify, UserController.logoutUser)

module.exports = router;
