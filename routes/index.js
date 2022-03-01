const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', {
    title: "Validate Your Idea Straight From Market Target | Clubhouse 🧠 💡",
    user: req.user
  })
})

router.get('/signup', (req, res) => {
  res.render('signup')
})

router.get('/login', (req, res) => {
  res.render('login')
})

module.exports = router;