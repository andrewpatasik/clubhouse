const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const moment = require('moment');

const postSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  postDate: {
    type: Date,
    default: new Date()
  },
  postTitle: {
    type: String,
    required: true
  },
  postContent: {
    type: String
  },
})

module.exports = mongoose.model('Post', postSchema);