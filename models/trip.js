const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tripSchema = new Schema({
  title: String,
  author: String,
  date: String,
  imagePath: String,
  creator: {type: mongoose.Schema.Types.ObjectId, ref: ' User', required: true }
})

module.exports = mongoose.model('Trip', tripSchema);