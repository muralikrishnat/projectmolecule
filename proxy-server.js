var proxyItem = function (s, t) {
    this.SourceUrl = s;
    this.TargetUrl = t;
};
var proxyManagerClass = function () {
    var proxyList = [];
    this.addProxy = function (proxyItem) {
        proxyList.push(proxyItem);
    };

    this.List = function () {
        return proxyList;
    };
};

var proxyConfig = {
    port: 5050
};


var ProxyManager = new proxyManagerClass();
ProxyManager.addProxy(new proxyItem('proxy-settings', 'http://localhost:' + proxyConfig.port));
ProxyManager.addProxy(new proxyItem('app', 'http://localhost:5060'));
//
//

//
//var proxyApp = require('express')();
//proxyApp.post('/proxy-settings/add-proxy', function (req, res) {
//    res.send('post method name value is : ', typeof req.params, typeof req.body);
//});
//
//proxyApp.use('/', function (req, res) {
//    res.send(ProxyManager.List());
//}).listen(5051);
//
//
//var http = require('http');
//var httpProxy = require('http-proxy');
//var _ = require('lodash');
//
//var proxy = httpProxy.createProxyServer({});
//var express = require('express');
//var proxyServer = express();
//
//var proxyApp1 = express();
//
//proxyServer.get('/', function (req, res) {
//    console.log('body of the request GET : ', req.body);
//    var requestPath = req.path;
//    if (requestPath.indexOf('/') === 0) {
//        requestPath = requestPath.substr(1);
//    }
//    var proxyItem = _.first(_.filter(ProxyManager.List(), function (filterItem) {
//        return requestPath.indexOf(filterItem.SourceUrl) === 0;
//    }));
//    if (proxyItem) {
//        proxy.web(req, res, {target: proxyItem.TargetUrl});
//    } else {
//        proxy.web(req, res, {target: 'http://localhost:5060'});
//    }
//});
//
//proxyServer.post('/add-proxy', function (req, res) {
//    console.log('body of the request POST : ', req.body);
//    var requestPath = req.path;
//    if (requestPath.indexOf('/') === 0) {
//        requestPath = requestPath.substr(1);
//    }
//    var proxyItem = _.first(_.filter(ProxyManager.List(), function (filterItem) {
//        return requestPath.indexOf(filterItem.SourceUrl) === 0;
//    }));
//    if (proxyItem) {
//        proxy.web(req, res, {target: proxyItem.TargetUrl});
//    } else {
//        proxy.web(req, res, {target: 'http://localhost:5060'});
//    }
//});
//
//proxyApp1.use('/proxy-settings', proxyServer).listen(5050);
//
//
////
////var proxy = require('express-http-proxy');
////
////var app = require('express')();
////
////app.use('/proxy', proxy('http://localhost:5060', {
////    forwardPath: function(req, res) {
////        return url.parse(req.url).path;
////    }
////})).listen(80);


var express = require('express');
var proxyServer = express();
var _ = require('lodash');

var httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer({});

var bodyParser = require('body-parser');

proxyServer.use(bodyParser.json());
proxyServer.use(bodyParser.urlencoded({extended: true}));

var proxyRouter = express();
proxyRouter.get('/', function (req, res) {
    var requestPath = req.path;
    if (requestPath.indexOf('/') === 0) {
        requestPath = requestPath.substr(1);
    }
    var proxyItem = _.first(_.filter(ProxyManager.List(), function (filterItem) {
        return requestPath.indexOf(filterItem.SourceUrl) === 0;
    }));
    if (proxyItem) {
        proxy.web(req, res, {target: proxyItem.TargetUrl});
    } else {
        res.send(ProxyManager.List());
    }
});

proxyRouter.post('/', function (req, res) {
    ProxyManager.addProxy(new proxyItem(req.body.sourcekey, req.body.targeturl));
    res.send(req.body);
});


proxyServer.use('/', proxyRouter).listen(proxyConfig.port);
