exports.fn = function (key, value, cb) {

  var app = this;
  var config = app.config;

  if (typeof key === 'undefined') {
    console.log(config.all());
    return cb();
  } else if (typeof value === 'undefined') {
    console.log(config.get(key));
  } else {
    console.log(config.set(key, value));
  }

  cb();

};

exports.description = 'Get/set configuration.';
exports.args = [
  {
    name: 'key',
    description: 'The configuration key to get/set.'
  },
  {
    name: 'value',
    description: 'New value for given key.'
  }
];

