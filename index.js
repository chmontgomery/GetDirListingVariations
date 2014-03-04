var qTest = require('./getDirListing_QPromises'),
  bluebirdTest = require('./getDirListing_BluebirdPromises'),
  callbacksTest = require('./getDirListing_Vanilla');

console.log('===> Running with vanilla callbacks...');
callbacksTest.run()
  .then(function () {
    console.log('===> Running with bluebird promises...');
  })
  .then(bluebirdTest.run)
  .then(function () {
    console.log('===> Running with q promises...');
  })
  .then(qTest.run);