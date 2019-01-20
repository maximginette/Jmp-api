
const express = require('express');
const router = express.Router();
const multer = require('multer');
const Trip = require('../models/trip');
const checkAuth = require('../middleware/check-auth');
const MIME_TYPE = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg',
}
const storage = multer.diskStorage({
  // destination
  destination: (req, file, cb) => {
    cb(null, './public/images')
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE[file.mimetype];
    cb(null, name + '.' + ext);
  }
});

const upload = multer({ storage: storage });

router.get('/', (req, res, next) => {
  Trip.find()
  .then(trips => {
    res.json(trips);
  })
  .catch()
});
router.post('/findById', (req, res, next) => {
  const id = req.body.id;
  Trip.findById(id)
  .then(response => {
    res.json(response);
  })
})
router.post('/', checkAuth, upload.single('image'), (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  const title = req.body.title;
  const author = req.body.author;
  const date = req.body.date;
  const imagePath = url + '/images/' + req.file.filename;
  const creator = req.userData.userId;
  res.status(200);
  const trip = new Trip({title, author, date, imagePath, creator});
  trip.save()
  .then(resp => {
    res.json(trip);
  })
  .catch(err => {
    console.log(err);
  })
});
module.exports = router;