const postModel = require('../models/post');
const async = require('async');

exports.index = (req, res, next) => {
  res.render('index', {
    title: "Share Your Story To Be Heard | Clubhouse 🧠 💡",
    user: req.user,
    data: [
      { name: 'Armin Artlert', username: 'armin' },
      { name: 'Mikasa Ackerman', username: 'mikasa' },
    ]
  })
}