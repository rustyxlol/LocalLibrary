const express = require('express');
const router = express.Router();
const userAuth = require('../controllers/authController');

router.get('/login', userAuth.login_get);
router.post('/login', userAuth.login_post);
router.get('/logout', userAuth.logout_get);
router.get('/signup', userAuth.signup_get);
router.post('/signup', userAuth.signup_post);

module.exports = router;
