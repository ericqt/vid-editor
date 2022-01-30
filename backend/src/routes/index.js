var express = require('express');
var router = express.Router();

var ffmpeg = require('fluent-ffmpeg');
var pathToFfmpeg = require('ffmpeg-static');
var trimRoutes = require('./trim');

/* home page resource. */
router.route('/')
  .get(function(req, res, next) {
    console.log("hello")
    res.send('Hello, world with slash at root');
  });
router.use('/trim', trimRoutes);

/* GET test page. */
router.get('/test', function(req, res, next) {
  res.send('Hello, test');
});


module.exports = router;
