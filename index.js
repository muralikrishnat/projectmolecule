var http = require('http');
var app = require('./server/app.js');
var globalConfig = require('./moleculeConfig')();

var server = http.createServer(app);

server.listen(globalConfig.port);
server.on('error', function(){
    console.log('Got Error!!!');
});
server.on('listening', function(){
    console.log('Yahoo!!!! its started working........');
});
