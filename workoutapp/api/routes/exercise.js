const express = require('express');
const router = express.Router();
const Workout = require('../models/workout');
const User = require('../models/user');
const Exercise = require('../models/exercise');
const Set = require('../models/set');
const verifyToken = require('../middleware/verify-token');
const exercise = require('../models/exercise');



//Getting Workouts For user
router.get('/:id', async(req, res) => {
    try {
        //Getting all workouts for user
        const exercise = await Exercise.findById(req.params.id);

            res.json({
                success: true,
                exercise: exercise
            })
   
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})


//Route getting multiple exercises based on params
router.post("/", verifyToken, async (req, res) => {
    try {

        if(req.body.searchParams !== null && req.body.searchParams.workoutId !== null && req.body.searchParams.isWarmup !== null) {
            try {
                const exercises = await Exercise.find({workoutId: req.body.searchParams.workoutId,
                warmUpExercise: req.body.searchParams.isWarmup})
                .populate('sets')
                .exec()

                const workout = await Workout.findById({_id:req.body.searchParams.workoutId}).exec();

                res.json({
                    success: true,
                    exercises: exercises,
                    workoutName: workout.name,
                    workoutId: workout._id
                })
            } catch (err) {
                res.status(500).json({
                    success: false,
                    message: err.message
                })
            }
        } else {
            try {
                const exercises = await Exercise.find({workoutId: req.body.workoutId})
                .populate('sets').exec()

                res.json({
                    success: true,
                    exercises: exercises
                })
            } catch(err) {
                res.status(500).json({
                    success: false,
                    message: err.message
                })
            }
        }


    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

//Creating new exercise
router.post('/create', verifyToken, async (req, res) => {
    try {
        const user = await User.findByUsername(req.decoded.username);
        const workout = await Workout.findById(req.body.workoutId);
        let sentSets = [];


        if(req.body.duplicate) {
            const foundExercise = await Exercise.findById(req.body.exerciseId);
            let newExercise = await new Exercise({
                name: foundExercise.name,
                sets: [],
                workoutId: workout._id,
                warmUpExercise: foundExercise.warmUpExercise,
                notes: foundExercise.notes,
                isCompleted: false
            })        

            for(let setId of foundExercise.sets) {
                let foundSet = await Set.findById(setId);
                
                let newSet = await new Set({
                    targetRepAmount: foundSet.targetRepAmount,
                    actualRepAmount: null,
                    exerciseId: newExercise._id,
                    targetWeight: foundSet.targetWeight,
                    actualWeight: null,
                    targetTimeinSeconds: foundSet.targetTimeinSeconds,
                    actualTimeinSeconds: null,
                    warmupSet: foundSet.warmupSet,
                    isCompleted: false,
                    targetLoad: foundSet.targetLoad,
                    actualLoad: null,
                    rpe: foundSet.rpe,
                    rest: foundSet.rest,
                })
                await newSet.save()
                await newExercise.sets.push(newSet._id);
                sentSets.push(newSet);
            }


            await newExercise.save();
            await workout.exercises.push(newExercise);
            await workout.save()


            res.json({
                success: true,
                exercise: newExercise,
                sets: sentSets
            })


        } else {
            const exercise = await new Exercise({
                name: req.body.name,
                sets: [],
                workoutId: workout._id,
                notes: req.body.notes,
                isCompleted: false,
                warmUpExercise: req.body.warmUpExercise
            });

            workout.exercises.push(exercise)
            await exercise.save()
            await workout.save()
            await user.save()
            

            res.json({
                success: true,
                exercise: exercise,
            })           
        }


    } catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }


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
        if(exercise.sets.length > 0) {
            for(let setId of exercise.sets)
            {
                await Set.findOneAndDelete({_id: setId});
            }            
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
        const exercise = await Exercise.findByIdAndUpdate(req.body.exerciseId, {
            $set: {
                name: req.body.name, 
                notes: req.body.notes,
                warmUpExercise: req.body.warmUpExercise                
            }
        });

        await exercise.save();

        res.json({
            success: true,
            message: "Successfully updated exercise"
        })
    } catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});

//Changing isCompleted to true or false
router.put('/isCompleted', async (req, res) => {
    try {
        const exercise = await Exercise.findByIdAndUpdate(req.body.exerciseId, {
            isCompleted: req.body.isCompleted
        });

        await exercise.save();

        res.json({
            success: true,
            message: "You have updated is Completed for exercise"
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})




module.exports = router;