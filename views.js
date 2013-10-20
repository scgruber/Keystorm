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

exports.register = function (req,res) {
  res.render('register');
};

exports.plan = function (req,res) {
  res.render('plan');
};

exports.keys = function (req,res) {
  Key.find(function(err, k) {
    res.render('keys'{
      count: k.length,
      keys: k
    });
  });
}

exports.fourohfour = function (req,res) {
    res.redirect('/'); // Simplistic
}