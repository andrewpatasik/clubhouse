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
})

router.get('/login', (req, res) => {
  res.render('login', {
    layout: '../views/layouts/sign-form',
    title: 'Log In',
    pageName: 'login'
  })
})

module.exports = router;