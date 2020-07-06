var mongoose = require('mongoose');

var ItemSchema = new mongoose.Schema({
  ProductTitle: {
    type: String,
    required: true
  },
  Productdescription: {
    type: String,
    required: true
  },
  ProductImage: { 
    type: String,
    required: true
  },
  Username: { 
    type: String,
    required: true
  }
});




var Item = mongoose.model('Item', ItemSchema);
module.exports = Item;
