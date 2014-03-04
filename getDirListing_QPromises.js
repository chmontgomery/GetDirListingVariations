var q = require("q"),
  fs = require("q-io/fs"),
  _ = require('lodash'),
  bluebird = require('bluebird');

function getDirListing(path) {

  // helper function (built into bluebird)
  function map(arr, iterator) {
    // execute the func for each element in the array and collect the results
    var promises = arr.map(function (el) {
      return iterator(el)
    });
    return q.all(promises); // return the group promise
  }

  function toFullPath(file) {
    return path + file;
  }

  function handleAllFiles(result) {
    return map(result, toFullPath);
  }

  function zipObject(dirs) {
    return _.chain(dirs)
      .zipObject()
      .transform(function (o, val, key) {
        o[key] = true;
      })
      .value();
  }

  function onlyDirs(file) {
    return fs.stat(file).then(function (file) {
      return !file.isFile()
    });
  }

  function ignoreHidden(name) {
    return !(name.substring(0, 1) === '.');
  }

  function toModuleNames(dir) {
    return dir.replace(path, '');
  }

  return fs.list(path)
    .then(handleAllFiles)
    /*.filter(onlyDirs)
     .map(toModuleNames)
     .filter(ignoreHidden)*/
    .then(zipObject);
}

// ============================================
// performance test
// ============================================
module.exports.run = function () {
  var tasks = [],
    timesToRun = 1000;

  for (var i = 0; i < timesToRun; i++) {
    tasks.push(new bluebird(function (resolve) {
      var time = process.hrtime();
      getDirListing('fixtures/lib/').then(function () {
        var diff = process.hrtime(time);
        resolve((diff[0] * 1e9 + diff[1]) / 1000000);
      });
    }));
  }

  return bluebird.all(tasks).then(function (results) {
    var totalSeconds = results[results.length - 1];
    console.log('benchmark took %d milliseconds', totalSeconds);
  });
};