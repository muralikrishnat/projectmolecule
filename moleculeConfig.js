var _ = require('lodash');

var devconfig= {};
var prodconfig = {};
var defaultconfig = {
  ENV:'dev',
  port:9000,
  rootPath:__dirname
};
module.exports = function(app){
  return _.assign(defaultconfig,(defaultconfig.ENV=='dev'?devconfig:(defaultconfig.ENV=='prod'?prodconfig:defaultconfig)));
};
