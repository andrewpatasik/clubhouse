const express = require('express');
const moment = require('moment');

const Post = require('../models/post');

exports.feed = [
  (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.redirect('/');
    }
  },
  (req, res, next) => {
    Post.find({})
      .populate('user')
      .exec((err, result) => {
        if (err) return next(err)

        res.render('feed', {
          title: "Share Your Story To Be Heard | Clubhouse 🧠 💡",
          user: req.user,
          feed: result
        })
      })
  }
]

exports.feed_post = (req, res) => {
  console.log(req.body)
  res.json({
    data: {
      title: req.body.title,
      content: JSON.parse(req.body.content)
    }
  })
}