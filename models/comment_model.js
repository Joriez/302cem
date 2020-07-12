var Comment = require('../models/comment');
var routes = require('../routes/router');

exports.CommentPost = function (req, res, next) {
    var commentData = {
        ProductID: req.body.ProductID,
        Comment: req.body.Comment,
        Username: req.body.Username
    }

    Comment.create(commentData, function (error, user) {
        if (error) {
            console.log(error)
        } else {
            res.jsonp({
                status: "success",
                user
            })
        }
    });
}

exports.CommentGet = function (req, res, next) {
    Comment.find({ ProductID: req.params.ProductID }, function (err, item) {
        res.jsonp({
            status: "success",
            item
        })
    })
}

exports.CommentPut = function (req, res) {
        console.log(req.body.selected_id)
        Comment.findByIdAndUpdate(req.body.selected_id, {
          $set: {
            Comment: req.body.change_comment
          }
        }, (err, result) => {
          if (err) return console.log(err)
          res.jsonp({
            status: "success",
            result
        })
        })
    
    
      }

  
      exports.CommentDelete = function (req, res) {
        console.log(req.body.method)
        Comment.findByIdAndDelete(req.body.method, (err, result) => {
          if (err) return res.send(err)
          res.jsonp({
            status: "success",
            result
        })
        })
    
    
      }