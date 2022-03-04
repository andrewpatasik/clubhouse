const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  user: {type: mongoose.Types.ObjectId, required: true},
  postDate: {type: Date},
  postTitle: {type: String, required: true},
  postContent: {type: String}, 
})

module.exports = mongoose.model('Post', postSchema);


