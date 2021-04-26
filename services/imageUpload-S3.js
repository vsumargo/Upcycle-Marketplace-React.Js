require("dotenv").config();

const S3 = require("aws-sdk/clients/s3");
const multer = require("multer");
const multerS3 = require("multer-s3");

const s3 = new S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "project3marketplace",
    acl: "public-read",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, `${Date.now().toString()}.png`);
    },
  }),
});

module.exports = upload;
