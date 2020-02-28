// models/response-model.js

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const responseSchema = new Schema({
  title: String,
  description: String,
  comment: {type: Schema.Types.ObjectId, ref: 'Comment'}
});

const Response = mongoose.model('Response', responseSchema);

module.exports = Response;