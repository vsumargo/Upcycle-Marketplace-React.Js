require("dotenv").config();
const router = require("express").Router();
const db = require("../../models");
const uploadImages = require("../../services/imageUpload-S3.js");

// const aws = require("aws-sdk");
// const multer = require("multer");
// // const multerS3 = require("multer-s3");

// aws.config.getCredentials(function (err) {
//   if (err) console.log(err.stack);
//   // credentials not loaded
//   else {
//     console.log("Access key:", aws.config.credentials.accessKeyId);
//   }
// });

// console.log("Region: ", aws.config.region);

// // aws.config.update({
// //   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
// //   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
// //   region: '"ap-southeast-2"',
// // });

// const s3 = new aws.S3({apiVersion: '2006-03-01'});
// const multerMemoryStorage = multer.memoryStorage();
// const uploadMemory = multer({
//     storage: multerMemoryStorage
// });
// const upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: "project3marketplace",
//     acl: "public-read",
//     metadata: function (req, file, cb) {
//       cb(null, { fieldName: file.fieldname });
//     },
//     key: function (req, file, cb) {
//       cb(null, Date.now().toString());
//     },
//   }),
// });

router.get("/search", (req, res) => {
  const itemName = req.query.item.toLowerCase();
  db.Post.find({ title: { $regex: itemName, $options: "i" } })
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

router.post("/api/postitem", uploadImages.array("images", 5), (req, res) => {
  const imagesURL = req.files.map((img) => {
    return { key: img.key, location: img.location };
  });
  const itemDetails = { ...req.body, images: imagesURL, userId: req.user._id };
  db.Post.create(itemDetails)
    .then((data) => {
      console.log(data._id);
      return db.UserDetails.updateOne(
        { userId: req.user._id },
        { $push: { postList: data._id } }
      );
    })
    .then(() => res.status(200).json({ success: true }))
    .catch((err) => res.status(500).json({ success: false, error: err }));
});

module.exports = router;
