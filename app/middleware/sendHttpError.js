module.exports = function(req, res, next){
    res.sendHttpError = function (err) {
        res.status(err.status);
        if(false){
            res.json(err);
        } else {
            res.render('error', { error: err });
        }
    };

    next();
};