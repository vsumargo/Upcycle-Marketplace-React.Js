const router = require("express").Router();
const db = require("../../models");

router.get("/search", (req, res) => {
  const itemName = req.query.item;
  db.Post.find({ title: { $regex: itemName, $options: "i" } })
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

module.exports = router;
