const express = require('express');
const router = express.Router();
const Workout = require('../models/workout');
const User = require('../models/user');
const Exercise = require('../models/exercise');
const Set = require('../models/set');
const verifyToken = require('../middleware/verify-token');


//Creating new set for exercise
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

//Deleting Workout
router.delete('/', async(req, res) => {
    try {
        const exercise = await Exercise.findById(req.body.exerciseId);

        let exerciseSets = exercise.sets;

        var filtered = exerciseSets.filter(function(value, index, arr){ 
            return value._id != req.body.setId;
        });
       

        //Deleting Sets within Exercises
        for(let setId of exercise.sets)
        {
            await Set.findOneAndDelete({_id: setId});
        }
    
        

        exercise.sets = []
        exercise.sets = filtered;
        exercise.save();

        res.json({
            success: true,
            message: "workout successfully deleted"
        })        
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }


})

//Editing Set for user targets
router.put('/update-set', async (req, res) => {
    try {
        if(req.body.updateType === "target")
        {
            const set = await Set.findByIdAndUpdate(req.body.setId, {
                targetRepAmount: req.body.targetRepAmount,
                targetWeight: req.body.targetWeight,
                targetTimeInSeconds: req.body.targetTimeInSeconds
            }); 
            await set.save();

            res.json({
                success: true,
                message: "Successfully updates set for target"
            })
        } else {
            const set = await Set.findByIdAndUpdate(req.body.setId, {
                actualRepAmount: req.body.actualRepAmount,
                actualWeight: req.body.actualWeight,
                actualTimeInSeconds: req.body.actualTimeInSeconds
            });
            await set.save();

            res.json({
                success: true,
                message: "Successfully updates set for actuals"
            })

        }
 
    } catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});






module.exports = router;