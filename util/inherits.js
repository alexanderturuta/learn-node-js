var util = require('util');

function Animal (name){
    this.name = name;
};

Animal.prototype.walk = function(){
    console.log("Ходит %s", this.name);
};

function Rabbit(name){
    this.name = name;
};

util.inherits(Rabbit, Animal);

Rabbit.prototype.jump = function(){
    console.log("Прыгает %s", this.name);
};

var rabbit = new Rabbit("Roger");

rabbit.walk();
rabbit.jump();