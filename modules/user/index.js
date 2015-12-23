//exports is result of require
var db = require('db');
var log = require('logger')(module);

function User(name){
    this.name = name;
};

User.prototype.hello = function (who) {
    log(db.getPhrase('Hello') + ", " + who.name);
};

//...

module.exports = User;
//exports = User; //!!does not work


// global.User = User
// global - object for globalization variables