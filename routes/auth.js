const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user');

router.post('/register', UserController.registerNewUser);

router.post('/login', UserController.userLogin);

router.delete('/:userId', UserController.deleteUser);

module.exports = router;
