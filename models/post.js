const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
  title: {
    type: String,
    lowercase: true,
    required: [true, "please enter post title"],
  },
  category: {
    type: String,
    lowercase: true,
    required: [true, "please enter post category"],
  },
  images: [
    {
      key: {
        type: String,
      },
      location: {
        type: String,
      },
    },
  ],
  price: {
    type: String,
    required: [true, "please set price"],
  },
  condition: {
    type: String,
    required: [true, "please set price"],
  },
  description: {
    type: String,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
