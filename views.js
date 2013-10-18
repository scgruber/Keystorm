var Key = require('./keymodel.js');

exports.home = function (req,res) {
  Key.find(function(err, k) {
    res.render('home', {
      eventname: 'Computer Club Keysigning Party',
      numKeys: global.keyCounter,
      keys: k
    });
  });
};

exports.upload = function (req,res) {
  res.render('upload');
};

exports.fourohfour = function (req,res) {
    res.redirect('/'); // Simplistic
}