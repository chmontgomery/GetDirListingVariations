module.exports = ServiceTwo;

function ServiceTwo() {
}

ServiceTwo.prototype.execute = function (cb) {
  cb(null, {
      name: 'serviceTwo'
  });
};

