module.exports = Service;

function Service() {
}

Service.prototype.handle = function (req, res, next) {
  throw new Error('bad service');
};
