
module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
        res.status(401).json({
            success: false,
            message: "You must login first",
            loginRedirect: '/login'
        })
    } 
    next();
}

//Middlewear Checking if the request was sent by a user that has been authenticated and logged in