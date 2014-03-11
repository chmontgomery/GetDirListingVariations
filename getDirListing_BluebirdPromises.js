var Promise = require("bluebird"),
  fs = Promise.promisifyAll(require('./benchmark/fsmock')),
  _ = require('lodash');

module.exports = getDirListing;

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
      return !file.isFile();
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
