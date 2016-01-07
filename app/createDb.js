var User = require('./models/user').User;

var user = new User({
    username: 'Tester1',
    password: 'secret'
});

user.save(function (err, user, affected) {
    if(err) throw err;
    User.findOne({username: 'Tester'}, function (err, res) {
        if(err) throw err;
        console.log(res);
    })
});