const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
//const keys = require('./keys');


//setting access to config vars
if (process.env.NODE_ENV === 'production') {
  clientID = process.env.googleClientID;
  clientSecret = process.env.googleClientSecret
}
else {
  const keys = require('./keys');
  clientID = keys.googleClientID;
  clientSecret = keys.googleClientSecret
}

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy({
      clientID: clientID,
      clientSecret: clientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    }, (accessToken, refreshToken, profile, done) => {
      console.log(accessToken);
      console.log(profile);
    })
  )

}