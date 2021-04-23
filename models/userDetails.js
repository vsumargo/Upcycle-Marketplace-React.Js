const mongoose = require('mongoose');
const { Schema } = mongoose;

const userDetailsSchema = new Schema({
  firstname: {
    type: String,
    lowercase: true,
    trim: true,
    minLength: 3,
    required: [true, "please enter firstname"],
  },
  lastname: {
    type: String,
    lowercase: true,
    trim: true,
    minLength: 2,
    required: [true, "please enter lastname"],
  },
  username: {
    type: String,
    trim: true,
  },
  address: {
    type: String,
    lowercase: true,
    required: [true, "please enter address"],
  },
  suburb: {
    type: String,
    lowercase: true,
    required: [true, "please enter suburb"],
  },
  postcode: {
    type: String,
    trim: true,
    required: [true, "please enter postcode"],
  },
  state: {
    type: String,
    trim: true,
    lowercase: true,
    required: [true, "please enter State Territory"],
  },
  country: {
    type: String,
    lowercase: true,
    required: [true, "please enter Country"],
  },
  mobile: {
    type: String,
    trim: true,
    required: [true, "please enter mobile phone"],
  },
  postList: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  watchList: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const UserDetails = mongoose.model("UserDetails", userDetailsSchema);

module.exports = UserDetails;
