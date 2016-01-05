var http = require('http');

var opts = require('optimist').argv;
console.log(process.env.HOME);
console.log(opts);

http.createServer(function(req, res){
   res.end('The server is running');
}).listen(opts.port);