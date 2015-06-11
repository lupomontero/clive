module.exports = function Run(app) {

  function done(err) {
    var code = 0;

    if (err) {
      console.error(err.message.red);
      code = 1;
    }

    process.exit(code);
  }

  return function run() {
    var argv = app.argv;
    var cmdName = argv._.shift() || 'help';
    var cmd = app.commands[cmdName];

    if (!cmd || typeof cmd.fn !== 'function') {
      return done(new Error('Unknown command: ' + cmdName));
    }

    cmd.args = cmd.args || [];

    var maxArgs = cmd.args.length;
    var minArgs = cmd.args.filter(function (a) { return a.required; }).length;

    if (argv._.length > maxArgs) {
      return done(new Error('Too many arguments'));
    }

    if (argv._.length < minArgs) {
      return done(new Error('Too few arguments'));
    }


    var args = cmd.args.map(function (arg) {
      return argv._.shift();
    });

    if (cmd.options && cmd.options.length) {
      args.push(cmd.options.reduce(function (memo, opt) {
        memo[opt.name] = argv[opt.name] || argv[opt.shortcut];
        return memo;
      }, {}));
    }

    var ee = cmd.fn.apply(app, args.concat(done));
  };

};

