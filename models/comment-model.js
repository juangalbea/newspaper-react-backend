// models/comment-model.js

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const commentSchema = new Schema({
  title: String,
  description: String,
  new: {type: Schema.Types.ObjectId, ref: 'New'},
  responses: [{type: Schema.Types.ObjectId, ref: 'Response'}],
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;