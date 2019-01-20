var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({name: 'serve'})
});
router.post('/post', function(req, res, next) {
 const email = req.body.email;
 const password = req.body.password;
 res.json({email, password})
});

module.exports = router;
