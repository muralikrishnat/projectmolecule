var http = require('http');
var app = require('./server/app.js');
var globalConfig = require('./globalConfig')();

var server = http.createServer(app);

server.listen(globalConfig.port);
server.on('error', function(){
    console.log('Got Error!!!');
});
server.on('listening', function(){
    console.log('Yahoo!!!! Main App Started', globalConfig.port);
});


var moleculeapp = require('./MoleculeManager/app.js');

var moleculeConfig = require('./MoleculeManager/moleculeConfig')();

var managerserver = http.createServer(moleculeapp);
console.log(moleculeConfig.port);
managerserver.listen(moleculeConfig.port);
managerserver.on('error', function(err){
    console.log('Got Error!!!', err);
});
managerserver.on('listening', function(){
    console.log('Yahoo!!!! Molecule Mananger Server Started ', moleculeConfig.port);
});
