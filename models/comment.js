const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
  body: {
    type: String,
    required: [true, "please enter comments"],
  },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  postId: { type: Schema.Types.ObjectId, ref: "Post" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
