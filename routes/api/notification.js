const router = require("express").Router();
const db = require("../../models");

router.post("/api/makeoffer", (req, res) => {
  console.log(req.user);
  console.log(req.body);
  db.Notification.create({ ...req.body, buyerId: req.user._id })
    .then((result) => {
      console.log(result);
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ success: false });
    });
});

router.post("/api/declineoffer", (req, res) => {
  db.Notification.create({ ...req.body.newNotificationData })
    .then((result) => {
      console.log(result);
      return db.Notification.updateOne(
        { _id: req.body.notificationId },
        { replyStatus: "decline" }
      );
    })
    .then((result2) => {
      console.log(result2);
      res.json({ success: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ success: false });
    });
});

router.post("/api/acceptoffer", (req, res) => {
  db.Notification.create({ ...req.body.newNotificationData })
    .then((result) => {
      console.log(result);
      return db.Notification.updateOne(
        { _id: req.body.notificationId },
        { replyStatus: "accept" }
      );
    })
    .then((result2) => {
      console.log(result2);
      res.json({ success: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ success: false });
    });
});

router.get("/api/notification", (req, res) => {
  db.Notification.find({
    $or: [
      { $and: [{ sellerId: req.user._id }, { acceptOffer: null }] },
      { $and: [{ buyerId: req.user._id }, { acceptOffer: { $ne: null } }] },
    ],
  })
    .populate("postId")
    .sort({ createdAt: -1 })
    .then((data) => {
      console.log(data);
      res.json(data);
    });
});

router.put("/api/notification", (req, res) => {
  db.Notification.updateOne(
    { _id: req.body.id },
    { viewed: true },
    { new: true }
  )
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(500).json({ success: false, error: err }));
});

module.exports = router;
