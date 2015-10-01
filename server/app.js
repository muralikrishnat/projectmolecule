var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();
var globalConfig = require('./../globalConfig')();
app.set('views', path.join(globalConfig.rootPath, 'client/views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(favicon(path.join(globalConfig.rootPath, 'client/assets/favicon.ico')));
app.use(require('less-middleware')(globalConfig.rootPath));

app.use('/js',express.static(path.join(globalConfig.rootPath, 'bower_components')));

app.use(function(req, res, next) {
  next();
});


var viewRouter = express.Router();

app.use(function(req, res, next) {
    res.sendFile(path.join(globalConfig.rootPath , 'index.html'));
  //res.render(globalConfig.rootPath + '/views/renderings/index.jade',{ title:'Express with jQuery' });
});


module.exports = app;
