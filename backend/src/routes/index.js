var express = require('express');
var router = express.Router();

/* home page resource. */
router.route('/')
  .get(function(req, res, next) {
    console.log("hello")
    res.send('Hello, world with slash');
  })
  .post(function(req, res, next) {
    console.log('we here in the post now', req)
    res.send(req.body)
  })

/* GET home page. */
router.get('/test', function(req, res, next) {
  console.log(req, "testeerererer")
  res.send('Hello, test');
});

module.exports = router;
