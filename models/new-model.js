// models/new-model.js

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const newSchema = new Schema({
  title: String,
  description: String,
  comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
  // owner will be added later on
});

const New = mongoose.model('New', newSchema);

module.exports = New;