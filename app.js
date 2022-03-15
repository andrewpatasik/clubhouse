const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const path = require('path');
require('dotenv').config();

const User = require('./models/user');


const indexRoute = require('./routes/index');
const feedRoute = require('./routes/feed');


const app = express();


mongoose.connect(process.env.MONGODB_URL);
const db = mongoose.connection;
db.on('error', console.error.bind('connection error'));


app.use(expressLayouts);
app.set('layout', './layouts/default')
app.set('view engine', 'ejs');



passport.use(new LocalStrategy((username, password, done) => {
  User.findOne({
    'username': username
  }, (err, user) => {

    if (err) return done(err);
    if (!user) {
      return done(null, false, {
        message: 'user is not existed'
      })
    } else {
      if (password !== user.password) {
        console.log('incorrect password');
        return done(null, false, {
          message: 'incorrect password'
        })
      }

      console.log(user.name + ' is logged in');
      return done(null, user)
    }
  })
}))

passport.serializeUser((user, done) => {
  done(null, user.id)
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(null, user)
  })
});

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
  secret: "topclubhouse",
  resave: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URL
  }),
  saveUninitialized: true,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({
  extended: false
}));


app.use('/', indexRoute);
app.use('/feed', feedRoute);

app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running at port 3000')
})