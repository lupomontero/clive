var fs = require('fs');
var path = require('path');

module.exports = function (app) {

  var paths = [ path.join(__dirname, 'builtin-cmd') ];
  var appCmdPath = path.join(app.settings.appdir, 'cmd');

  if (fs.existsSync(appCmdPath)) {
    paths.push(appCmdPath);
  }

  return paths.reduce(function (memo, dir) {
    return fs.readdirSync(dir).reduce(function (memo, fname) {
      var matches = /^([a-z]+)\.js$/.exec(fname);
      if (matches) {
        memo[matches[1]] = require(path.join(dir, fname));
      }

      return memo;
    }, memo);
  }, {});

};

