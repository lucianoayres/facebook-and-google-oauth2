import passport from "passport";
import passportFacebookOauth20 from "passport-facebook";

import config from "./configuration/configFacebook.js";

const FacebookStrategy = passportFacebookOauth20.Strategy;

passport.use(
  new FacebookStrategy(
    {
      clientID: config.api_key,
      clientSecret: config.api_secret,
      callbackURL: config.callback_url,
      // PS: optional Field. Email is only available if this line is added
      //profileFields: ["id", "displayName", "email"],
    },
    function (accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);

// Passport session setup.
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

export default FacebookStrategy;
