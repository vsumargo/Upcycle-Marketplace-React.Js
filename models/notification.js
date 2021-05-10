const mongoose = require("mongoose");
const { Schema } = mongoose;

const notificationSchema = new Schema({
  buyerId: { type: Schema.Types.ObjectId, ref: "User" },
  sellerId: { type: Schema.Types.ObjectId, ref: "User" },
  offerPrice: {
    type: String,
    required: [true, "please set an offer price"],
  },
  acceptOffer: { type: Boolean, default: null },
  replyStatus: { type: String, default: null },
  viewed: { type: Boolean, default: false },
  message: { type: String },
  createdAt: { type: Date, default: Date.now },
  postId: { type: Schema.Types.ObjectId, ref: "Post" },
});

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
