const router = require("express").Router();
const db = require("../../models");

router.post("/api/checkemailexist", (req, res) => {
  db.User.find({ email: req.body.email }, "email").then((data) => {
    console.log(`Check if email exist:\n\n${data}\n--------\n`);
    res.json(data);
  });
});

router.post(
  "/api/register/user",
  ({ body: { email, password, userDetails } }, res) => {
    const details = userDetails;
    db.User.create({ email: email, password: password })
      .then(({ _id }) => {
        console.log(_id);
        const userDetails = { ...details, userId: _id };
        console.log(userDetails);
        return db.UserDetails.create(userDetails);
      })
      .then((result) => {
        console.log(result);
        res.json(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ success: false });
      });
  }
);

module.exports = router;
