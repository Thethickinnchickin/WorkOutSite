const express = require('express');
const router = express.Router();
const Workout = require('../models/workout');
const User = require('../models/user');
const Exercise = require('../models/exercise');
const Set = require('../models/set');
const verifyToken = require('../middleware/verify-token');



router.post('/create', async (req, res) => {
    const user = await User.findByUsername("Matt");
    const exercise = await Exercise.findById(req.body.exerciseId);

    const set = await new Set({
        targetRepAmount: req.body.targetRepAmount,
        actualRepAmount: null,
        exerciseId: exercise._id,
        targetWeight: req.body.targetWeight,
        actualWeight: null,
        targetTimeinSeconds: req.body.targetTimeinSeconds,
        actualTimeinSeconds: null,
        warmupSet: req.body.warmupSet,
    });

    exercise.sets.push(set);
    await set.save();
    await exercise.save()
    await user.save()
    

    res.json({
        success: true,
        exercise: exercise
    })

})



module.exports = router;