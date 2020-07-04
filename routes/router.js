var express = require('express');
var router = express.Router();
var User = require('../models/user');
var path = require('path')
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
app.set('view engine', 'ejs');

var username = "";
router.use(bodyParser.urlencoded({ extended: false }));
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




// GET route to redirect to '/profile' page after registering
router.get('/main', function (req, res, next) {
    User.findById(req.session.userId)
        .exec(function (error, user) {
            if (error) {
                return next(error);
            } else {
                if (user === null) {
                    var err = new Error('Not authorized! Go back!');
                    err.status = 400;
                    try {
                        res.render(path.join(__dirname, '../views/main.ejs'), { name: username });
                    } catch (e) {

                    }
                } else {

                    username = user.username;

                    res.render(path.join(__dirname, '../views/main.ejs'), { name: username });

                }
            }
        });
});


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