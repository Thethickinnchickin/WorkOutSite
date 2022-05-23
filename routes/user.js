const express = require('express');
const router = express.Router();
const User = require('../models/user');


//Registering user
router.post('/register', async (req, res) => {
    try {
        const {email, username, password} = req.body;
        console.log(req.body);
        const user = new User({
            email: email,
            username: username
        });
        const registeredUser = await User.register(user, password);  
        req.login(registeredUser, err => {
            if(err) return next(err);
            res.status(200).json({
                success: true,
                user: registeredUser    
            })
        })

    }catch (err) {
        res.status(500).json({
            success: false,
            err: err.message
        }) 
    }    
});

module.exports = router;