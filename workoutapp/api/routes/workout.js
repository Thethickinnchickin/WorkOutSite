const express = require('express');
const router = express.Router();
const Workout = require('../models/workout');
const Exercise = require('../models/exercise');
const User = require('../models/user');
const Set = require('../models/set');
const verifyToken = require('../middleware/verify-token');



//Creating Workout 
router.post('/create', async (req, res) => {
    const user = await User.findByUsername("Matt");


    const workout = await new Workout({
        name: req.body.name,
        exercises: [],
        userId: user._id,
        isCompleted: false
    });
    await workout.save()
    await user.workouts.push(workout);
    await user.save()
    

    res.json({
        success: true,
        workout: workout
    })

});

//Deleting Workout
router.delete('/', async(req, res) => {
    try {
        const user = await User.findByUsername("Matt");

    
        let userWorkouts = user.workouts
        var filtered = userWorkouts.filter(function(value, index, arr){ 
            return value._id != req.body.workoutId;
        });

        const workout = await Workout.findOne({_id: req.body.workoutId})

        //Deleting exercises inside workout
        for(let exerciseId of workout.exercises)
        {
            const exercise = await Exercise.findById(exerciseId);

            //Deleting Sets within Exercises
            for(let setId of exercise.sets)
            {
                await Set.findOneAndDelete({_id: setId});
            }
            await Exercise.findOneAndDelete({_id: exerciseId});
        }

        await Workout.findOneAndDelete({_id: req.body.workoutId});

        user.workouts = []
        user.workouts = filtered;
        user.save();

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

//Editing Workout for user
router.put('/', async (req, res) => {
    try {
        const workout = await Workout.findByIdAndUpdate(req.body.workoutId, {
            name: req.body.name, 
        });

        await workout.save();

        res.json({
            success: true,
            message: "Successfully updates workout"
        })
    } catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }



});



module.exports = router;