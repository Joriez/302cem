var item = require('../models/item');
var routes = require('../routes/router');
var User = require('../models/user');
var multer = require('multer');
const path = require('path')
const storage = multer.diskStorage({
    destination: function(req, file, cb){
      cb(null, './uploads/');
    },
    filename: function(req, file, cb){
      cb(null, file.originalname);
    }
  });
var upload = multer({storage: storage})




exports.ItemGet = function (req, res, next){

      item.find({}, function (err, item) {
        //console.log(item)
        res.jsonp({
          status: "success",
          item
      })
      })


    }
