var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var keySchema = new Schema({
  id: String,
  name: String,
  email: String,
  fingerprint: String,
  exp: String,
  file: String
});

module.exports = mongoose.model('Key', keySchema);
