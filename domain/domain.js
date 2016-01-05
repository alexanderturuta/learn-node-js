var domain = require('domain');
var fs = require('fs');
var http = require('http');

var d = domain.create(),
    server;

d.on('error', function(err){
    console.error('Domain has caught an error: %s', err);
});

server = new http.Server();

d.run(function(){
    //d.enter();

    //server = new http.Server();
    d.add(server);
    //d.remove(server);

    //d.exit();
});

server.on('boom', function(){
    setTimeout(function(){
        fs.readFile(__filename, function(){
            ERROR();
        });
    }, 1000)
});

server.emit('boom');