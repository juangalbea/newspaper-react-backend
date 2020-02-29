// models/reply-model.js

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const replySchema = new Schema({
  title: String,
  description: String,
  comment: {type: Schema.Types.ObjectId, ref: 'Comment'}
});

const Reply = mongoose.model('Reply', replySchema);

module.exports = Reply;