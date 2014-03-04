var fs = require('./fsmock');

module.exports = getDirListing;

function getDirListing(path, cb) {
  var directories = [], statCtr = 1;
  function addPaths(err, dirs) {
    if (err) return cb(err);
    dirs = dirs.map(function (dir) {
      return path + dir;
    });
    dirs.forEach(function (dir) {
      fs.stat(dir, doneStat.bind(null, dirs.length, dir));
    });
  }
  function doneStat(len, dir, err, stat) {
    if (err) return cb(err);
    if (!stat.isFile()) directories.push(dir);
    if (len === statCtr++) {
      cb(null, zipAndFilter(directories, path));
    }
  }
  function zipAndFilter(dirs, path) {
    var obj = {};
    dirs.forEach(function (dir) {
      var name = dir.replace(path, '');
      if (name.substring(0, 1) === '.') return;
      obj[name] = true;
    });
    return obj;
  }
  fs.readdir(path, addPaths);
}

