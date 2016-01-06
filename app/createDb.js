var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/chat';
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
    if(err) throw err;

    var c = db.collection('test_insert');
    c.remove({}, function(err, items){
        console.log(arguments)
        c.insert({a:2}, function(err, docs){
            if(err) throw err;

            var cursor = c.find({a:2});
            cursor.toArray(function (err, res) {
                console.dir(res);

                db.close();
            });
        });
    })


});