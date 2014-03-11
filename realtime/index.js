var bluebird = require("bluebird"),
  qPromises = require('../getDirListing_QPromises'),
  bluebirdPromises = require('../getDirListing_BluebirdPromises'),
  listingVanilla = require('../getDirListing_Vanilla');

var run = function (func) {
  var tasks = [],
    timesToRun = 1000;

  for (var i = 0; i < timesToRun; i++) {
    tasks.push(new bluebird(func));
  }

  return bluebird.all(tasks).then(function (results) {
    var totalSeconds = results[results.length - 1];
    console.log('realtime test took %d milliseconds', totalSeconds);
  });
};

console.log('q...');
run(function (resolve) {
  var time = process.hrtime();
  qPromises('fixtures/lib/').then(function () {
    var diff = process.hrtime(time);
    resolve((diff[0] * 1e9 + diff[1]) / 1000000);
  });
})
  .then(function () {
    console.log('bluebird...');
    return run(function (resolve) {
      var time = process.hrtime();
      bluebirdPromises('fixtures/lib/').then(function () {
        var diff = process.hrtime(time);
        resolve((diff[0] * 1e9 + diff[1]) / 1000000);
      });
    });
  })
  .then(function () {
    console.log('vanilla...');
    return run(function (resolve) {
      var time = process.hrtime();
      listingVanilla('fixtures/lib/', function (err, o) {
        var diff = process.hrtime(time);
        resolve((diff[0] * 1e9 + diff[1]) / 1000000);
      });
    });
  });