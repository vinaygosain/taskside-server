var FacebookTokenStrategy = require('passport-facebook-token');
var passport = require('passport');
var myconstants= require('./myconstants');

passport.use(new FacebookTokenStrategy({
    clientID: myconstants.APP_ID,
    clientSecret: myconstants.APP_SECRET
  }, function (accessToken, refreshToken, profile, done) {
    //User.findOrCreate({facebookId: profile.id}, function (error, user) {
    return done(profile);
    //});
  }
));
