var fs = require('fs');

fs.writeFile('temp.tmp', 'data', function(err){
    if(err) throw err;

    fs.rename('temp.tmp', 'new.tmp', function(err){
        if(err) throw err;

        fs.unlink('new.tmp', function(err){
            if(err) throw err;
        })
    })
});