var http = require('http');

var server = new http.Server(function(req, res){
    console.log(req.headers);
    res.writeHead(200, 'OK', { 'Cache-control': 'no-cache' });
    //res.setHeader('Cache-control', 'no-cache'); //removeHeader
    res.end();
});

server.listen(1337, '127.0.0.1');