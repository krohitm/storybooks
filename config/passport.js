const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
//const keys = require('./keys');

//load user model
require('../models/User');
const User = mongoose.model('users');

//setting access to config vars
if (process.env.NODE_ENV === 'production') {
  clientID = process.env.googleClientID;
  clientSecret = process.env.googleClientSecret;
}
else {
  const keys = require('./keys');
  clientID = keys.googleClientID;
  clientSecret = keys.googleClientSecret;
}

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy({
      clientID: clientID,
      clientSecret: clientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    }, (accessToken, refreshToken, profile, done) => {
      //console.log(accessToken);
      //console.log(profile);

      const image = profile.photos[0].value.substring(0,
        profile.photos[0].value.indexOf('?'));

      const newUser = {
        googleID: profile.id,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        email: profile.emails[0].value,
        image: image
      }

      //check if user already exists
      User.findOne({ googleID: profile.id })
        .then(user => {
          if (user) {
            done(null, user);
            //req.flash('error_msg', 'An account already exists wth this email.');
            //res.redirect('/users/register');
          }
          else {
            //save new user
            new User(newUser)
              .save()
              .then(user => done(null, user));
          }
        })
    })
  );

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id).then(user => done(null, user));
  });
}