const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const {isLoggedIn} = require('../middleware/authentication')
const verifyToken = require('../middleware/verify-token')


router.post('/user', verifyToken, async (req, res) => {
    try {
        let foundUser = await User.findOne({_id: req.decoded._id})

        res.json({
            success: true,
            user: foundUser
        })
        
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "didnt work"
        })
    }
})

//Login Route, Authentication done using passport
//Using session to return user to their previous url or /restaurants if that is null

router.post('/login', passport.authenticate('local'), async (req, res) => {
    try {
        let user = await User.findByUsername(req.body.username);

        if(user) {
            let token = jwt.sign(user.toJSON(), 'super secret secret', {
                expiresIn: 604000 //1 week
            })
            req.login(user, err => {
                if(err) return next(err);
                res.status(200).json({
                    success: true,
                    message: "successfully logged In",
                    token: token
                })
            })  
        } else {
            res.status(500).json({
                success: false,
                message: 'user not found'
            })
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

//Registering user
router.post('/register', async (req, res) => {
    try {
        const {email, username, password} = req.body;
        const user = new User({
            email: email,
            username: username
        });

        let token = jwt.sign(user.toJSON(), 'super secret secret', {
            expiresIn: 604000 //1 week
        })

        //Registering thorugh user schema
        const registeredUser = await User.register(user, password);  
        req.login(registeredUser, err => {
            if(err) return next(err);
            res.status(200).json({
                success: true,
                message: "successfully created a new user",
                token: token
            })
        })

    }catch (err) {
        res.status(500).json({
            success: false,
            err: err.message
        }) 
    }    
});




//Logout Route UnAuthenticating user with passport 

router.post('/logout', isLoggedIn,(req, res) => {
    req.logout();
    res.json({
        success: true,
        message: 'Logout successful'
    })
});


module.exports = router;