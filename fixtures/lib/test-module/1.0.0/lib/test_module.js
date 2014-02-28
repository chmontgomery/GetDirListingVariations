module.exports = TestModule;

function TestModule(params) {
  this.params = params;
}

TestModule.prototype.execute = function (params, cb) {
  cb(null, {
      view: 'module'
    , partials: ['_header', '_footer']
    , num: 44
  });
};
