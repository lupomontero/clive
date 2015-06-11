var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
var _ = require('lodash');

module.exports = function Config(app) {

  mkdirp.sync(app.settings.confdir);

  var fname = path.join(app.settings.confdir,  app.pkg.name + '.json');
  var data = {};
  if (fs.existsSync(fname)) {
    _.extend(data, require(fname));
  }

  var config = {};

  config.all = function () {
    return _.extend({}, data);
  };

  config.get = function (key) {
    return data[key];
  };

  config.set = function (key, value) {
    data[key] = value;
    fs.writeFileSync(fname, JSON.stringify(data, null, 2));
    return value;
  };

  return config;

};

