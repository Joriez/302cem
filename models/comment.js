var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
  ProductID: {
    type: String,
    required: true
  },
  Comment: {
      type: String,
      required: true
  },
  Username: { 
    type: String,
    required: true
  }
});




var Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;
