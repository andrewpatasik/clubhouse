const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', {
    title: "Validate Your Idea Straight From Market Target | Clubhouse 🧠 💡",
    user: req.user,
    data: [
      { name: 'Armin Artlert', username: 'armin' },
      { name: 'Mikasa Ackerman', username: 'mikasa' },
    ]
  })
})

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