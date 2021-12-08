var express = require('express');
var router = express.Router();

var ffmpeg = require('fluent-ffmpeg');
var pathToFfmpeg = require('ffmpeg-static')

/* home page resource. */
router.route('/')
  .get(function(req, res, next) {
    console.log("hello")
    res.send('Hello, world with slash');
  })
  .post(function(req, res, next) {
    command = ffmpeg('./videos/new_test.mp4');
    command.inputOptions(['-hwaccel_output_format']);
    res.json(req.body)
  })

/* GET home page. */
router.get('/test', function(req, res, next) {
  res.send('Hello, test');
});

module.exports = router;
