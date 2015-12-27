var http = require('http');
var fs = require('fs');

http.createServer(function(req, res){
    var info;

    if(req.url == '/'){
        fs.readFile('index.html', function(err, info) {
            if(err){
                console.log(err);
                res.statusCode = 500;
                res.end('Internal server error');
                return;
            }
            res.end(info);
        });
    } else {
        res.statusCode = 404;
        res.end('Page not found');
        return;
        //404
    }
}).listen(3000);