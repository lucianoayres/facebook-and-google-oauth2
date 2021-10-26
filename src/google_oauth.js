import passport from "passport";
import passportGoogleOauth20 from "passport-google-oauth20";

import config from "./configuration/configGoogle.js";

const GoogleStrategy = passportGoogleOauth20.Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: config.api_key,
      clientSecret: config.api_secret,
      callbackURL: config.callback_url,
      // optional Field. PS: Email is only available if this line is added
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

export default GoogleStrategy;
