const express = require('express');
const passport = require('passport');
const Post = require('../models/post');

exports.index = (req, res, next) => {
  if (!req.isAuthenticated()) {
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
  } else {
    res.redirect('/feed');
  }
};

exports.login_get = (req, res, next) => {
  res.render('login', {
    layout: '../views/layouts/sign-form',
    title: 'Log In',
    pageName: 'login'
  })
}

exports.login_post = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
})

exports.logout_post = (req, res) => {
  req.logout();
  res.redirect('/')
}