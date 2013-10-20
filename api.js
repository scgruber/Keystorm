var Key = require('./keymodel.js')
  , exec = require('child_process').exec
  , fs = require('fs');

exports.addKey = function(req, res) {
  if (req.body.human == "yes") {
    var thisFileCounter = global.fileCounter++; // Local copy and increment
    var filename = "keys/" + thisFileCounter + ".asc";
    fs.writeFile(filename, req.body.pubkey, function (err) {
      if (err) throw err;
      var parsechild = exec('gpg --dry-run --with-fingerprint keys/' + thisFileCounter + '.asc', function (error, stdout, stderr) {
        console.log('gpg error: ' + stderr);
        if (error !== null) {
          console.log('exec error: ' + error);
        } else {
          var rxp = /pub\s+(\w{5}\/\w{8})\s\d{4}-\d{2}-\d{2}\s(.+)\s<(.+)>\s+Key\sfingerprint\s=\s(\w{4}\s\w{4}\s\w{4}\s\w{4}\s\w{4}\s\s\w{4}\s\w{4}\s\w{4}\s\w{4}\s\w{4})\nsub\s+\w{5}\/\w{8}\s\d{4}-\d{2}-\d{2}\s\[expires:\s(\d{4}-\d{2}-\d{2})\]/;
          var keyValues = stdout.match(rxp);
          console.log(keyValues); // For testing
          new Key({
            id: keyValues[1],
            name: keyValues[2],
            email: keyValues[3],
            fingerprint: keyValues[4],
            exp: keyValues[5],
            key: req.body.pubkey
          }).save();
          console.log('Recorded public key '+ keyValues[1] + ' for ' + keyValues[2]);
          res.redirect('/dump#' + keyValues[1]);
        }
      });
    });
  } else {
    res.send('Filthy robots!');
  }
};

exports.listKeys = function(req,res) {
  Key.find(function(err, keys) {
    res.send(keys);
  });
};
