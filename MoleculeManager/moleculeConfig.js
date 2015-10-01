var _ = require('lodash');

var devconfig= {};
var stageconfig= {};
var prodconfig = {};
var defaultconfig = {
  ENV:'dev',
  port:3454
};
module.exports = function(app){
  return _.assign(defaultconfig,(defaultconfig.ENV=='dev'?devconfig:(defaultconfig.ENV=='prod'?prodconfig:defaultconfig)));
};
