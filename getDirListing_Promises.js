var Promise = require("bluebird"),
  fs = Promise.promisifyAll(require('fs')),
  _ = require('lodash');

function getDirListing(path) {
  function toFullPath(file) {
    return path + file;
  }
  function zipObject(dirs) {
    return _.chain(dirs)
      .zipObject()
      .transform(function(o, val, key) {
        o[key] = true;
      })
      .value();
  }
  function onlyDirs(file) {
    return fs.statAsync(file).then(function(file) {
      return !file.isFile()
    });
  }
  function ignoreHidden(name) {
    return !(name.substring(0,1) === '.');
  }
  function toModuleNames(dir) {
    return dir.replace(path, '');
  }
  return fs.readdirAsync(path)
    .map(toFullPath)
    .filter(onlyDirs)
    .map(toModuleNames)
    .filter(ignoreHidden)
    .then(zipObject);
}

// ============================================
// performance test
// ============================================

var totalRuns = 1000,
  tasks = [];

for (var i = 0; i < totalRuns; i++) {
  tasks.push(new Promise(function(resolve) {
    var time = process.hrtime();
    getDirListing('fixtures/lib/').then(function() {
      var diff = process.hrtime(time);
      resolve((diff[0] * 1e9 + diff[1])/1000000);
    });
  }));
}

Promise.all(tasks).then(function(results) {
  var totalSeconds = results[results.length-1];
  console.log('benchmark took %d milliseconds', totalSeconds);
});
