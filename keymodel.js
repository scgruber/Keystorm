var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var keySchema = new Schema({
  id: String,
  name: String,
  email: String,
  fingerprint: String,
  exp: String,
  key: String
});

module.exports = mongoose.model('Key', keySchema);
