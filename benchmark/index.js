var Benchmark = require('benchmark'),
  qPromises = require('./getDirListing_QPromises'),
  bluebirdPromises = require('./getDirListing_BluebirdPromises'),
  listingVanilla = require('./getDirListing_Vanilla'),
  suite = new Benchmark.Suite();

suite.add('q', function () {
  qPromises('a').then(function (listing) {
    // noop
  }).catch(function (err) {
      throw err;
    });
});

suite.add('bluebird', function () {
  bluebirdPromises('a').then(function (listing) {
    // noop
  }).catch(function (err) {
    throw err;
  });
});

suite.add('vanilla', function () {
  listingVanilla('a', function (err, listing) {
    if (err) throw err;
    // noop
  });
});

suite.on('cycle', function(event) {
  console.log(String(event.target));
});

suite.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').pluck('name'));
});

console.log('Running bench...');
suite.run({async: true});
