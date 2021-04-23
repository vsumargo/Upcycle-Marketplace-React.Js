const router = require("express").Router();
const user = require("./user.js");
const userDetails = require("./userDetails.js");
const post = require("./post.js");
const comment = require("./comment.js");
const auth = require('./authenticationRoute.js');

// Book routes
router.use(user);
router.use(userDetails);
router.use(post);
router.use(comment);
router.use(auth);

module.exports = router;
