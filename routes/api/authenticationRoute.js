const router = require("express").Router();
const db = require("../../models");
const passport = require("../../config/passport.js");

router.post("/api/login", passport.authenticate("local"), (req, res) => {
  res.status(200).json({ success: true });
});

router.post("/api/signup", (req, res) => {
  console.log(req.body);
  db.User.create({
    email: req.body.email,
    password: req.body.password,
  })
    .then((res) => console.log(res))
    .catch((err) => {
      console.log(err);
      res.status(401).json(err);
    });
});

module.exports = router;
