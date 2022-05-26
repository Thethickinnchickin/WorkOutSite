const express = require('express');
const router = express.Router();
const Workout = require('../models/workout');
const User = require('../models/user');
const Exercise = require('../models/exercise');
const Set = require('../models/set');
const verifyToken = require('../middleware/verify-token');



router.post('/create', async (req, res) => {
    const user = await User.findByUsername("Matt");
    const workout = await Workout.findById(req.body.workoutId);

    const exercise = await new Exercise({
        name: req.body.name,
        sets: [],
        workoutId: workout._id,
        notes: req.body.notes
    });

    workout.exercises.push(exercise)
    await exercise.save()
    await workout.save()
    await user.save()
    

    res.json({
        success: true,
        workout: workout
    })

})



module.exports = router;