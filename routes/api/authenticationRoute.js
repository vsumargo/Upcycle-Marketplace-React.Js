const router = require("express").Router();
const db = require("../../models");
const passport = require("../../config/passport.js");

router.post("/api/login", passport.authenticate("local"), (req, res) => {
  res.status(200).json({ success: true });
});

router.post("/api/register/user", (req, res) => {
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

router.get('/api/logout', (req,res) => {
  // if (!req.user){
  //   return res.redirect('/');
  // }
  req.logout();
  res.end();
})

router.get('/api/userstatus', (req,res) => {
  if (!req.user) {
    return res.json({isLoggedin : false});
  }
  res.status(200).json ({isLoggedin: true});
})

module.exports = router;
