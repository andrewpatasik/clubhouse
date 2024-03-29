const express = require('express');
const router = express.Router();

const indexController = require('../controllers/indexController');

router.get('/', indexController.index);

router.post('/signup', indexController.signup_post, indexController.login_post);

router.get('/login', indexController.login_get);
router.post('/login', indexController.login_post);

router.post('/logout', indexController.logout_post);

module.exports = router;