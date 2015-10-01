var grunt = require('grunt');
var path = require('path');
var http = require('http');
var fs = require('fs');
var _ = require('lodash');
var Download = require('download');
var request = require("request");
var exec = require('child_process').execSync;

var rootPath = __dirname;
var atomsFolder = path.join(rootPath, '/atom_components');

var o = grunt.file.readJSON(path.join(rootPath, 'project.json'));

var depsList = Object.keys(o.deps);
request({
    uri: o.atoms-server-url,
    method: "POST",
    form: {
        atoms: depsList.join(','),

    }
}, function (error, response, body) {
    if(body == null || error){
        console.log('server is not up ');
        process.exit();
    }
    var depsDetails = JSON.parse(body);
    depsList.forEach(function (atomItem) {
        console.log('Initializing  ' + atomItem + ' Atom ');
        var atomDetails = _.filter(depsDetails, {
            "Name": atomItem
        });
        if (atomDetails != null && atomDetails.length > 0) {
            if (o.deps[atomItem] == 'build') {

                new Download({
                        mode: '755'
                    })
                    .get(atomDetails[0].buildUrl)
                    .dest(path.join(rootPath, 'atom_components/' + atomItem))
                    .run();
            } else {
                var cmd = 'git clone -b ' + o.deps[atomItem] + ' --single-branch ' + atomDetails[0].buildUrl;
                try {
                    exec(cmd, {
                        cwd: path.join(rootPath, 'atom_components')
                    }, function (error, stdout, stderr) {
                        if (!error) {
                            console.log('Atom ' + atomItem + ' Build successfully imported');
                        } else {
                            console.log('got error ', stderr);
                        }
                    });
                } catch (er) {
                    console.log('Execution of cloning Got Errors');
                }
            }
        } else {
            console.warn('Atom ' + atomItem + '  not Found in registry!!!!!');
        }

    });


});
