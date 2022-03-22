const express = require('express');
const passport = require('passport');
const bcrypt = require('bcryptjs') ;

const User = require('../models/user');
const Post = require('../models/post');

exports.index = (req, res, next) => {
  if (!req.isAuthenticated()) {
    Post.find({})
      .populate('user')
      .exec((err, result) => {
        if (err) return next(err)

        res.render('index', {
          title: "Share Your Story To Be Heard | Overheard 🧠 💡",
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

exports.signup_post = (req, res, next) => {
  User.findOne({ username: req.body.username }, (err, user) => {
    if (err) return next(err);

    if (user) {
      console.log(user.username + ' is already existed')
      res.redirect('/')
    } else {
      bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
        if (err) return next(err);

        let user = new User({
          name: req.body.fullname,
          username: req.body.username,
          password: hashedPassword
        });

        user.save((err) => {
          if (err) return next(err);
          console.log('successfully created');
          next();
        })
      })
    }
  })
}