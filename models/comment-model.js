// models/comment-model.js

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const commentSchema = new Schema({
  title: String,
  description: String,
  new: {type: Schema.Types.ObjectId, ref: 'New'},
  replies: [{type: Schema.Types.ObjectId, ref: 'Reply'}],
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;