const jwt = require('jsonwebtoken');

//Verfying user has token and sending deconded token in request
// returns decoded user object in request

module.exports = function(req, res, next) {
    let token = req.headers["x-access-token"] || req.headers["authorization"];
    let checkBearer = "Bearer "
    if(token.startsWith(checkBearer)){
        token = token.slice(checkBearer.length, token.length);
    }

    if(token) {
        jwt.verify(token, 'super secret secret', (err, decoded) => {
            if (err) {
                res.json({
                    success: false,
                    message: "Failed to authenticate"
                })
            } else {
                req.decoded = decoded
                next()
            }
        })
    } else {
        res.json({
            success: false,
            message: "Failed to authenticate"
        });
    }
}