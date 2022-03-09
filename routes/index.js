const express = require('express');
const router = express.Router();

const indexController = require('../controllers/indexController');

router.get('/', indexController.index)

router.get('/signup', (req, res) => {
  res.render('signup', {
    layout: '../views/layouts/sign-form',
    title: 'Sign Up',
    pageName: 'signup'
  })
});

router.get('/login', indexController.login_get);
router.post('/login', indexController.login_post);

router.post('/logout', indexController.logout_post);

module.exports = router;