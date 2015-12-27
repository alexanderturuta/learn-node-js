var http = require('http');
var fs = require('fs');

http.createServer(function(req, res){
    var info;

    if(req.url == '/'){
        try {
            info = fs.readFileSync('index.html')
        } catch(err) {
            console.log(err);
            res.statusCode = 500;
            res.end('Internal Server Error');
            return;
        }
        res.end(info);
    } else {
        res.statusCode = 404;
        res.end('Page not found');
        return;
        //404
    }
}).listen(3000);