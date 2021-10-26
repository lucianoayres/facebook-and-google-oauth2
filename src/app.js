import express from "express";
import passport from "passport";
import cookieParser from "cookie-parser";
import session from "express-session";
import FacebookStrategy from "./facebook_oauth.js";
import GoogleStrategy from "./google_oauth.js";

const app = express();

app.set("view engine", "ejs");
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());
//app.use(express.static("public"));

app.get("/", function (req, res) {
  console.log(req.user);
  res.render("index", { user: req.user });
});

app.get(
  "/auth/facebook",
  //passport.authenticate("facebook")
  // PS: Facebook does not require the 'scope' option to work
  // on this method, because it uses the original 'app' permissions
  // settings. In order to get additional data, 'facebook_oauth.js'
  // have the 'profileFields' line uncommented
  passport.authenticate("facebook", { scope: ["public_profile"] })
);

app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/",
    failureRedirect: "/login",
  }),
  function (req, res) {
    res.redirect("/");
  }
);

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/login",
  }),
  function (req, res) {
    res.redirect("/");
  }
);

app.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

app.listen(3000, () => console.log("Server up on port 3000"));
