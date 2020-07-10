var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Item = require('../models/item');
var Items = require('../models/item_model');
var Comments = require('../models/comment_model');
var path = require('path')
var app = express();
var bodyParser = require('body-parser');
app.set('view engine', 'ejs');


const request = require('request')


var multer = require('multer');
const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, './public/uploads/');
  },
  filename: function(req, file, cb){
    cb(null, file.originalname);
  }
});

const methodOverride = require('method-override');
const { url } = require('inspector');
router.use(methodOverride('_method'));

var upload = multer({storage: storage})



var username = "";
router.use(bodyParser.urlencoded({ extended: true }));
// GET route for homepage
router.get('/', function (req, res, next) {
    return res.sendFile(path.join(__dirname + '/views/index.html'));

});

//POST route for updating data
router.post('/', function (req, res, next) {

    if (req.body.password !== req.body.passwordConf) {
        var err = new Error('Password does not match');
        err.status = 400;
        res.json({
            status: 'failure',
            error: {
                code: '400',
                text: 'Password does not match!'
            }
        });
        return next(err);
    }

    if (req.body.email &&
        req.body.username &&
        req.body.password &&
        req.body.passwordConf) {

        var userData = {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            passwordConf: req.body.passwordConf
        }

        User.create(userData, function (error, user) {
            if (error) {
                return next(error);
            } else {
                req.session.userId = user._id;
                username = user.username;
                return res.redirect('/username');
            }
        });

    } else if (req.body.logemail && req.body.logpassword) {
        authemail = req.body.logemail
        authpassword = req.body.logpassword
        User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
            if (error || !user) {
                var err = new Error('Wrong email or password');
                err.status = 401;
                return res.json({
                    status: 'failure',
                    error: {
                        code: '401',
                        text: 'Wrong email or password'
                    }
                });
            } else {
                req.session.userId = user._id;
                username = user.username;
                exports.authemail = authemail
                exports.authpassword = authpassword
                res.redirect('/main'); // go to the page
                //res.send(user.username);
            }
        });
    } else {
        var err = new Error('All fields are required');
        err.status = 402;
        return res.json({
            status: 'failure',
            error: {
                code: '402',
                text: 'All fields are required'
            }
        });
    }
})

router.get("/username", function (req, res, next) {
    var loginUser = req.session.userId;
    var isLogined = !!loginUser;
    // res.jsonp({
    //   isLogined: isLogined,
    //   name: loginUser || ''
    // });
    User.findById(loginUser, function (err, user) {
        res.jsonp({ username: user })
    });

})

router.get('/login', function (req, res, next){
    res.sendFile(path.join(__dirname , '../views/login22.html'));
  })
  
router.get('/register', function (req, res, next) {
    res.sendFile(path.join(__dirname , '../views/register22.html'));
})
router.get('/forgetpassword', function (req, res, next) {
    res.sendFile(path.join(__dirname , '../views/forget22.html'));
})
router.get('/memberindex', function (req, res, next) {
    res.sendFile(path.join(__dirname , '../views/memberindex.html'));
})
router.get('/blog', function(req, res, next) {
    res.sendFile(path.join(__dirname , '../views/blog.html'));
})

router.get('/upload', function(req, res, next) {
    res.sendFile(path.join(__dirname , '../views/upload.html'));
})

router.get('/aboutme', function(req, res, next) {
    res.sendFile(path.join(__dirname , '../views/aboutme.html'));
})

router.get('/update', function(req, res, next) {
    res.sendFile(path.join(__dirname , '../views/update.html'));
})

router.get('/shopwomen', function(req, res, next) {
    res.sendFile(path.join(__dirname , '../views/shopw.html'));
})

router.get('/test', function(req, res, next) {
    res.sendFile(path.join(__dirname , '../views/test.html'));
})

router.post('/dblog', function(req, res, next) {
    res.render(path.join(__dirname, '../views/dblog.ejs') ,{item_id: req.body.product_id});
})


router.post('/item', upload.single('ProductImage') ,function (req, res, next){
    var image = req.file.filename
    //console.log(req.file)
    var CreateData = {
      ProductImage: image,
      ProductTitle: req.body.ProductTitle,
      Productdescription: req.body.Productdescription,
      Username: req.body.Username
    }

  
        Item.create(CreateData, function (error, CreateData) {
          if (error) {
            console.log(error)
          } else {

          }
        });
  
  
      }
    );


    router.get('/USD', function(req , res , next){
        
        const url = `https://free.currconv.com/api/v7/convert?compact=ultra&apiKey=7a0a61a015e2ff9b28a8&q=HKD_USD&`


    request.get(url, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            const results = JSON.parse(body)

			//console.log(results)
            return res.send(results)
        } else {
            return callback({message: 'Problem with Google API query.', error: error, statusCode: response.statusCode})
        }
    })


    })
    router.get('/JPY', function(req , res , next){
        
        const url = `https://free.currconv.com/api/v7/convert?compact=ultra&apiKey=7a0a61a015e2ff9b28a8&q=HKD_JPY&`


    request.get(url, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            const results = JSON.parse(body)

			//console.log(results)
            return res.send(results)
        } else {
            return callback({message: 'Problem with Google API query.', error: error, statusCode: response.statusCode})
        }
    })


    })
    router.get('/SGD', function(req , res , next){
        
        const url = `https://free.currconv.com/api/v7/convert?compact=ultra&apiKey=7a0a61a015e2ff9b28a8&q=HKD_SGD&`


    request.get(url, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            const results = JSON.parse(body)

			//console.log(results)
            return res.send(results)
        } else {
            return callback({message: 'Problem with Google API query.', error: error, statusCode: response.statusCode})
        }
    })


    })
  
    router.get('/item', Items.ItemGet);
    router.get('/item/:blog_id', Items.ItemGetOne)
    router.put('/item', Items.ItemPut);
    router.delete("/item", Items.ItemDelete)

    router.post('/comment', Comments.CommentPost)
    router.get('/comment/:ProductID', Comments.CommentGet)
    router.put("/comment/:id", Comments.CommentPut);
    router.delete("/comment/:id", Comments.CommentDelete);

// GET for logout
router.get('/logout', function (req, res, next) {
    if (req.session) {
        // delete session object
        req.session.destroy(function (err) {
            if (err) {
                return next(err);
            } else {
                return res.redirect('/');
            }
        });
    }
});

module.exports = router;

//https://free.currconv.com/api/v7/convert?q=USD_HKD&compact=ultra&apiKey=7a0a61a015e2ff9b28a8