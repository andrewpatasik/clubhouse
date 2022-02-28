const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', {
    title: "Discuss Ideas With Like-Minded People | Clubhouse 🧠 💡",
  })
})

module.exports = router;