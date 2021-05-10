const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "please enter email address"],
    unique: true,
    match: [/.+@.+\..+/, "Please enter a valid e-mail address"],
  },
  password: {
    type: String,
    required: [true, "please enter password"],
  },
  createdAt: { type: Date, default: Date.now },
  userDetails: { type: Schema.Types.ObjectId, ref: "UserDetails" },
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  bcrypt
    .genSalt(10)
    .then((salt) => {
      return bcrypt.hash(this.password, salt);
    })
    .then((hash) => {
      this.password = hash;
      next();
    })
    .catch((err) => {
      return next(err);
    });
});

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password).then((result) => {
    if (!result) {
      return false;
    }
    return true;
  });
};

const User = mongoose.model("User", userSchema);

module.exports = User;
