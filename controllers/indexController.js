const Post = require('../models/post');
const User = require('../models/user');
const async = require('async');

exports.index = (req, res, next) => {
  Post.find({})
    .populate('user')
    .exec((err, result) => {
      if (err) return next(err)

      res.render('index', {
        title: "Share Your Story To Be Heard | Clubhouse 🧠 💡",
        user: req.user,
        feed: result 
      })
    })
};
