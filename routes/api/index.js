const router = require("express").Router();
const user = require("./user.js");
const userDetails = require("./userDetails.js");
const post = require("./post.js");
const notification = require("./notification.js");
const auth = require("./authenticationRoute.js");

// Book routes
router.use(user);
router.use(userDetails);
router.use(post);
router.use(notification);
router.use(auth);

module.exports = router;
