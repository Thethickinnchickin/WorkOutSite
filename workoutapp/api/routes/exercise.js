const express = require('express');
const router = express.Router();
const Workout = require('../models/workout');
const User = require('../models/user');
const Exercise = require('../models/exercise');
const Set = require('../models/set');
const verifyToken = require('../middleware/verify-token');


//Creating new exercise
router.post('/create', async (req, res) => {
    const user = await User.findByUsername("Matt");
    const workout = await Workout.findById(req.body.workoutId);

    const exercise = await new Exercise({
        name: req.body.name,
        sets: [],
        workoutId: workout._id,
        notes: req.body.notes,
        isCompleted: false
    });

    workout.exercises.push(exercise)
    await exercise.save()
    await workout.save()
    await user.save()
    

    res.json({
        success: true,
        workout: workout
    })

});

//Deleting Workout
router.delete('/', async(req, res) => {
    try {
        const workout = await Workout.findById(req.body.workoutId);

        let workoutExercises = workout.exercises;
        var filtered = workoutExercises.filter(function(value, index, arr){ 
            return value._id != req.body.exerciseId;
        });
       
        const exercise = await Exercise.findById(req.body.exerciseId);

        //Deleting Sets within Exercises
        for(let setId of exercise.sets)
        {
            await Set.findOneAndDelete({_id: setId});
        }
        await Exercise.findOneAndDelete({_id: req.body.exerciseId});
        

        workout.exercises = []
        workout.exercises = filtered;
        workout.save();

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
        const exercise = await Workout.findByIdAndUpdate(req.body.exerciseId, {
            name: req.body.name, 
            notes: req.body.notes
        });

        await exercise.save();

        res.json({
            success: true,
            message: "Successfully updates exercise"
        })
    } catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }



});




module.exports = router;