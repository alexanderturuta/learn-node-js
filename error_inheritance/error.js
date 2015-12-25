var util = require('util');

var phrases = {
    "Hello": "Привет",
    "world": "мир"
};

function PhraseError(message){
    this.message = message;
    Error.captureStackTrace(this, PhraseError);
}

util.inherits(PhraseError, Error);
PhraseError.prototype.name = "PhraseError";

function HttpError(status, message){
    this.status = status;
    this.message = message;
    Error.captureStackTrace(this, HttpError);
}

util.inherits(HttpError, Error)
HttpError.prototype.name = "HttpError";

function getPhrase(name){
    if(!phrases[name]){
        throw new PhraseError("There is no such phrase: "+ name); //HTTP 500 notification
    }
    return phrases[name];
}

function makePage(url){
    if(url !== "index.html"){
        throw new HttpError(404, "There is no such page"); //HTTP 404
    }

    return util.format("%s, %s!", getPhrase("**"), getPhrase("world"));
}

try {
    var page = makePage("index.html");

    console.log(page);
} catch(e) {
    if(e instanceof HttpError){
        console.log(e.status, e.message);
    } else{
        console.log("Error %s message %s stack: %s", e.name, e.message, e.stack);
    }
}