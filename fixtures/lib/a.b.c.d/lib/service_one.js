module.exports = ServiceOne;

function ServiceOne() {
}

ServiceOne.prototype.execute = function (cb) {
  cb(null, {
      name: 'serviceOne'
  });
};
