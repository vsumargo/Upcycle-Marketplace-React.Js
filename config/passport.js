const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
const db = require("../models");

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    function (email, password, done) {
      db.User.findOne({email}, function (err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: "Incorrect email." });
        }

        user.comparePassword(password).then((result) => {
          if (!result) {
            return done(null, false, { message: "Incorrect password." });
          }
          return done(null, user);
        });
      });
    }
  )
);

passport.serializeUser(function (user, done) {
  console.log("serialize user");
  console.log({ user });
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  console.log("deserialize user");
  db.User.findById(id, function (err, user) {
    done(err, user);
  });
});

module.exports = passport;
