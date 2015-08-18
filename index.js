var path = require('path');
var minimist = require('minimist');
var callsite = require('callsite');
var colors = require('colors');
var _ = require('lodash');

module.exports = function Clive(options) {

  options = options || {};

  var appdir = options.appdir || path.dirname(callsite()[1].getFileName());
  var pkg = require(path.join(appdir, 'package.json'));
  var confdir = options.confdir || path.join(process.env.HOME, '.' + pkg.name);
  var argv = minimist(process.argv.slice(2));

  if (argv.v || argv.version) {
    console.log(pkg.version);
    process.exit(0);
  }

  var app = {
    settings: {
      appdir: appdir,
      confdir: confdir
    },
    pkg: pkg,
    argv: argv
  };

  app.config = require('./lib/config')(app, options.defaultConfig);
  app.commands = require('./lib/commands')(app);
  app.run = require('./lib/run')(app);

  return app;

};

