const express = require('express');
const moment = require('moment');
const {
  body,
  validationResult
} = require('express-validator');

const Post = require('../models/post');
const User = require('../models/user');

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

exports.feed_post = [
  (req, res, next) => {
    res.locals.content = req.body.content.replace(/\\n/g, "\\n");
    next();
  },
  (req, res) => {
    let post = new Post({
      user: req.user,
      postDate: new Date(),
      postTitle: req.body.title,
      postContent: res.locals.content,
      postContentPreview: req.body.preview
    })

    post.save((err) => {
      if (err) return next(err);
      res.redirect('/feed');
    })
  }
]

exports.feed_user_post = (req, res) => {
  Post.findById(req.params.id)
    .populate('user')
    .exec((err, result) => {
      if (err) return next(err);
      res.render('post', {
        user: req.user,
        title: `${result.postTitle} by ${result.user.username}`,
        data: result 
      })
    })
}