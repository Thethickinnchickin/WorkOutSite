const express = require('express');
const router = express.Router();
const Workout = require('../models/workout');
const User = require('../models/user');
const verifyToken = require('../middleware/verify-token');



router.post('/create', async (req, res) => {
    const user = await User.findByUsername("Matt");


    const workout = await new Workout({
        name: req.body.name,
        exercises: []
    });
    await workout.save()
    await user.workouts.push(workout);
    await user.save()
    

    res.json({
        success: true,
        workout: workout
    })

})

module.exports = router;