require('dotenv').config();

var express = require('express');

let jwt = require('jsonwebtoken');
const knex = require('./knex/knex.js');

var app = express();

const bodyParser = require('body-parser');
var routes = require('./routes');
const md5 = require('md5');

const PORT = 3002;
const AUTH_SECRET = process.env.AUTH_SECRET;


// Node.js body parsing middleware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Allow CORS from any origin for now
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, x-access-token');

  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.send(200);
  }
  else {
    next();
  }
});


app.get('/', function (req, res) {
  res.send("Blog Page - Write your post")
});

// AUTH Middleware
const authMiddleware = function (req, res, next) {
  var token = req.headers['x-access-token'];
  console.log(token)
  if (token) {
    jwt.verify(token, AUTH_SECRET, function (err, decoded) {
      if (err) {
        return res.status(401).json({ success: false, message: err.message || 'Unable to verify token' });
      }
      else {
        req.decodedToken = decoded;
        next();
      }
    });
  } else {
    return res.status(401).send({
      success: false,
      message: 'No token available'
    });
  }
}

const unAuthorizedResponse = function(res){
  return res.status(401).json({ success: false, message: 'Invalid Credentials' });
}

// Login API
app.post('/api/login', function (req, res) {
  knex.select('*').from("users").where({ email: req.body.email, password: md5(req.body.password || "") }).then(function (users) {
    const user = (users && typeof users == "object" && users[0]) || null;
    if (!user) {
      return unAuthorizedResponse(res)
    }

    const userObj = {
      name: user.name,
      email: user.email,
      id: user.id,
    }
    const token = jwt.sign(userObj, AUTH_SECRET, {
      expiresIn: 10080
    });

    return res.status(200).json({
      success: true,
      user: userObj,
      token: token
    })
  }).catch(function (err) {
    return unAuthorizedResponse(res)
  })
})

app.use('/api', authMiddleware, routes);


app.listen(PORT, function () {
  console.log('Example app listening on port 3002!');
});