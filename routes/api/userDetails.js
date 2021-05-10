const router = require("express").Router();
const db = require("../../models");

router.get("/api/watchlist", (req, res) => {
  if (!req.user) {
    return res
      .status(401)
      .json({ status: "Unauthorized Access. Please Login" });
  }
  db.UserDetails.findOne({ userId: req.user._id }, "watchList")
    .populate("watchList")
    .then((data) => {
      // console.log(data);
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ success: false, error: err });
    });
});

router.put("/api/add/watchlist", (req, res) => {
  if (!req.user) {
    return res
      .status(401)
      .json({ status: "Unauthorized Access. Please Login" });
  }
  db.UserDetails.updateOne(
    { userId: req.user._id },
    { $push: { watchList: req.body.id } },
    { new: true }
  )
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(500).json({ success: false, error: err }));
});

router.put("/api/remove/watchlist", (req, res) => {
  if (!req.user) {
    return res
      .status(401)
      .json({ status: "Unauthorized Access. Please Login" });
  }
  db.UserDetails.updateOne(
    { userId: req.user._id },
    { $pull: { watchList: req.body.id } },
    { new: true }
  )
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(500).json({ success: false, error: err }));
});

module.exports = router;
