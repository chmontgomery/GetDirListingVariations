module.exports = Service;

function Service() {
}

Service.prototype.handle = function (req, res, next) {
  res.end('good');
};
