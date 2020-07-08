var item = require('../models/item');
var routes = require('../routes/router');
var User = require('../models/user');
var multer = require('multer');
const path = require('path')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
var upload = multer({ storage: storage })




exports.ItemGet = function (req, res, next) {

    item.find({}, function (err, item) {
        //console.log(item)
        res.jsonp({
            status: "success",
            item
        })
    })


}



exports.ItemGetOne = function (req, res, next) {
    item.findOne({ _id: req.params.blog_id }, function (err, item) {
        res.jsonp({
            status: "success",
            item
        })
    })


}


exports.ItemDelete = function (req, res, next) {
    item.findByIdAndDelete(req.body.item_id, (err, result) => {
        if (err) return res.send(err)
        res.jsonp({
            status: "success",
            result
        })
    })
}
exports.ItemPut = function (req, res, next) {
        item.findByIdAndUpdate(req.body.item_id, {
          $set: {
            Productdescription: req.body.description,
            ProductTitle: req.body.title
          }
        }, (err, result) => {
          if (err) return console.log(err)
          res.jsonp({
            status: "success",
            result
        })
        })
  
    
    
      }

  
