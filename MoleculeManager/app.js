var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var grunt = require('grunt');

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
var apiRouter = express.Router();

apiRouter.get('/', function(req, res, next) {
    res.send('this is api call');
    res.end();
});

apiRouter.get('/atom-deps', function(req, res, next) {
    var o = grunt.file.readJSON(path.join(globalConfig.rootPath,'project.json'));
    res.send(o.deps);
    res.end();
});


//TODO: this must be move to atom service api
apiRouter.post('/atoms', function(req, res, next) {
    console.log(req.body.atoms);
    var atomsLists = [
        {Name:"atom1", Title: "Atom 1", buildUrl: "https://github.com/muralikrishnat/atom1.git", srcUrl: "https://github.com/muralikrishnat/atom1.git"},
        {Name:"atom2", Title: "Atom 2", buildUrl: "https://raw.githubusercontent.com/muralikrishnat/atom2/build/build.js", srcUrl: "https://github.com/muralikrishnat/atom2.git"}
    ];
    res.send(atomsLists);
    res.end();
});


app.use('/api', apiRouter);

app.use(function(req, res, next) {
    res.sendFile(path.join(globalConfig.rootPath , 'moleculemanager/index.html'));
  //res.render(globalConfig.rootPath + '/views/renderings/index.jade',{ title:'Express with jQuery' });
});


module.exports = app;
