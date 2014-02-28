module.exports = LocalModule;

function LocalModule() {
}

LocalModule.prototype.execute = function (params, cb) {
  cb(null, {
      view: 'module'
    , num: 44
  });
};
