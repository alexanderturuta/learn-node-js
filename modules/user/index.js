//exports is result of require
var phrases = require('./ru');

function User(name){
    this.name = name;
};

User.prototype.hello = function (who) {
    console.log(phrases.Hello + ", " + who.name);
};

//...

module.exports = User;
//exports = User; //!!does not work


// global.User = User
// global - object for globalization variables