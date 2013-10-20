var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var keySchema = new Schema({
  id: {type: String, unique: true, required: true},
  name: {type: String, required: true},
  email: {type: String, required: true},
  fingerprint: {type: String, required: true},
  exp: {type: String, required: false},
  key: {type: String, required: true}
});

module.exports = mongoose.model('Key', keySchema);
