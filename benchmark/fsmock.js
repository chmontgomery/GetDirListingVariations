module.exports = {
  stat: function (dir, cb) {
    function next() {
      cb(null, {
        isFile: function () {
          return false;
        }
      });
    }
    process.nextTick(next);
  },
  readdir: function (path, cb) {
    function next() {
      cb(null, [
        'a', 'b', 'c', 'd', 'e'
      ]);
    }
    process.nextTick(next);
  }
};
