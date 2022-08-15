const jwt = require('jsonwebtoken');

//Verfying user has token and sending deconded token in request
// returns decoded user object in request

module.exports = function(req, res, next) {
    let token = req.headers["x-access-token"] || req.headers["authorization"];
    let checkBearer = "Bearer "


    if(token) {
        if(token.startsWith(checkBearer)){
            token = token.slice(checkBearer.length, token.length);
        } 

        jwt.verify(token, 'super secret secret', (err, decoded) => {
            if (err) {
                res.status(401).json({
                    success: false,
                    message: "Failed to authenticate",
                    status: 401
                })
            } else {
                req.decoded = decoded
                next()
            }
        })
    } else {
        res.status(401).json({
            success: false,
            message: "Failed to authenticate",
            status: 401
        });
    }
}