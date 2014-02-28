var Promise = require("bluebird"),
  fs = Promise.promisifyAll(require('fs')),
  _ = require('lodash');

function getDirListing(path, cb) {
  var directories = [], statCtr = 1;
  function addPaths(err, dirs) {
    if (err) {
      return cb(err);
    }
    dirs = dirs.map(function (dir) {
      return path + dir;
    });
    dirs.forEach(function (dir) {
      fs.stat(dir, doneStat.bind(null, dirs.length, dir));
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
  fs.readdir(path, addPaths);
}

// ============================================
// performance test
// ============================================

var totalRuns = 1000,
  tasks = [];

for (var i = 0; i < totalRuns; i++) {
  tasks.push(new Promise(function(resolve) {
    var time = process.hrtime();
    getDirListing('fixtures/lib/', function(err, o) {
      var diff = process.hrtime(time);
      resolve((diff[0] * 1e9 + diff[1])/1000000);
    });
  }));
}

Promise.all(tasks).then(function(results) {
  var totalSeconds = results[results.length-1];
  console.log('benchmark took %d milliseconds', totalSeconds);
});

// ============================================
// Example runs
// ============================================

/*

 benchmark took 103.234374 milliseconds

 benchmark took 106.310094 milliseconds

 benchmark took 103.02496 milliseconds

 benchmark took 101.188726 milliseconds

 benchmark took 100.582985 milliseconds

 benchmark took 104.616164 milliseconds

 benchmark took 103.611433 milliseconds

*/
