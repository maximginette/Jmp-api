var express = require('express');
var router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
/* GET users listing. */
router.post('/signup',(req, res, next) => {
  bcrypt.hash(req.body.password, 12)
  .then(hash => {
    const newUser = new User({
      email: req.body.email,
      password: hash
    });
  newUser.save()
  .then(response => {
    res.json({"data": response});
  })
  .catch(err => {console.log(err)});
  });
});
router.post('/login', function(req, res, next) {
  let userInfo;
  User.findOne({email: req.body.email})
  .then( user => {
    userInfo = user;
    return bcrypt.compare(req.body.password, user.password);
  })
  .then(result => {
    console.log(userInfo)
    if(!result) {
      return res.status(200).json({
        message: 'Auth failed',
      })
    }
    const token = jwt.sign({
      email: userInfo.email,
       userId: userInfo._id},
       'secret_should_be_longer',
       {expiresIn: '1h'});
    res.json({token, expiresIn: 3600});
  })
  .catch(err => {
    return res.status(200).json({
      message: 'Auth failed',
    })
  })
});

module.exports = router;
