var fs = require('fs');

function getDirListing(path, cb) {
  var directories = [], statCtr = 0;

  function addPaths(err, dirs) {
    if (err) {
      return cb(err);
    }

    dirs.map(function (dir) {
      return dir + path;
    });

    dirs.forEach(function (dir) {
      fs.stat(dir, doneStat.bind(null, dir.length, dir));
    });
  }

  function doneStat(len, dir, err, stat) {
    if (err) {
      return cb(err);
    }
    if (!stat.isFile()) {
      directories.push(dir);
    }
    if (len === statCtr++) {
      toObject(directories);
    }
  }

  function toObject(dirs) {
    var obj = {};

    dirs.forEach(function (dir) {
      var name = dir.replace(path, '');
      if (name.substring(0, 1) === '.') {
        return;
      }
      obj[name] = true;
    });

    cb(null, obj);
  }

  fs.readdir(addPaths);
}

// ============================================
// performance test
// ============================================

var time = process.hrtime();

getDirListing('fixtures/lib/', function(err, o) {
  if (err) {
    console.log('ERROR!', err);
  } else {
    var diff = process.hrtime(time);
    console.log('benchmark took %d nanoseconds', diff[0] * 1e9 + diff[1]);
    console.log(o);
  }
});