const express = require('express');
const router = express.Router();
const Workout = require('../models/workout');
const Exercise = require('../models/exercise');
const User = require('../models/user');
const Set = require('../models/set');
const verifyToken = require('../middleware/verify-token');



//Getting Workouts For user
router.post('/', verifyToken, async(req, res) => {
    try {

        //Getting all workouts for user
        const user = await User.findByUsername(req.decoded.username)
        if(req.body.searchParams.isCompleted)
        {
            const workouts = await Workout.find({userId: user._id})
            .where({isCompleted: true})
            .limit(req.body.searchParams.totalWorkouts)
            .populate({
                path: 'exercises',
                populate: {
                    path: 'sets'
                }
            })
            .sort({dateScheduled: 1})
            .exec();             
            res.json({
                success: true,
                workouts: workouts
            });
        } else {
            const workouts = await Workout.find({userId: user._id})
            .where({isCompleted: false})
            .limit(req.body.searchParams.totalWorkouts)
            .populate({
                path: 'exercises',
                populate: {
                    path: 'sets'
                }
            })
            .sort({dateScheduled: -1})
            .exec(); 
                    
            res.json({
                success: true,
                workouts: workouts
            })
        }     
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

//Getting Workouts For user
router.post('/:id', verifyToken, async(req, res) => {
    try {

        if(req.body.searchParams) {
            if(req.body.searchParams.isWarmup === true)
            {
                //Getting all workouts for user
                const workout = await Workout.findById(req.params.id)
                .where({isWarmup: true})
                .populate({
                    path: 'exercises',
                    populate: {
                        path: 'sets'
                    }
                }).exec();

                res.json({
                    success: true,
                    workout: workout
                })
            } else if(req.body.searchParams.isWarmup === false){
                //Getting all workouts for user
                const workout = await Workout.findById(req.params.id)
                .where({isWarmup: false})
                .populate({
                    path: 'exercises',
                    populate: {
                        path: 'sets'
                    }
                }).exec();

                res.json({
                    success: true,
                    workout: workout
                })
            } 
        }

        //Getting all workouts for user
        const workout = await Workout.findById(req.params.id)
        .populate({
                path: 'exercises',
                populate: {
                    path: 'sets'
                }
        }).exec();


        res.json({
            success: true,
            workout: workout
        })        
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})



//Creating Workout 
router.post('/create/new', verifyToken, async (req, res) => {
    const user = await User.findByUsername(req.decoded.username);
    let date = new Date(req.body.dateScheduled)
    date.setDate(date.getDate() + 1);

    if(req.body.duplicate) {
        try {
            let duplicateWorkout = new Workout({
                name: req.body.workout.name,
                exercises: [],
                userId: user._id,
                isCompleted: false,
                dateScheduled: date,
                notes: req.body.workout.notes
            });

            for(let exercise of req.body.workout.exercises){
                let foundExercise = await Exercise.findById(exercise._id);
                let newExercise = await new Exercise({
                    name: foundExercise.name,
                    workoutId: duplicateWorkout._id,
                    warmUpExercise: foundExercise.warmUpExercise,
                    notes: foundExercise.notes,
                    isCompleted: false,
                    sets: []
                })

                if(exercise.sets.length > 0) {
                    for(let set of exercise.sets) {
                        let foundSet = await Set.findById(set._id);
                        let newSet = await new Set({
                            targetRepAmount: foundSet.targetRepAmount,
                            targetWeight: foundSet.targetWeight,
                            targetTimeInSeconds: foundSet.targetTimeInSeconds,
                            warmUpSet: foundSet.warmUpSet,
                            exerciseId: newExercise._id,
                            isCompleted: foundSet.isCompleted,
                            actualRepAmount: null,
                            actualWeight: null,
                            actualTimeinSeconds: null,
                        });     
                        
                        await newSet.save();  
                        await newExercise.sets.push(newSet._id);       
                    }      
                    await newExercise.save()              
                }

                await newExercise.save();
                await duplicateWorkout.exercises.push(newExercise._id);
                await duplicateWorkout.save()
            }

            res.json({
                success: true,
                workout: duplicateWorkout
            })             
        } catch (e) {
            res.status(500).json({
                success: false,
                message: e.message
            })
        }

    } else {
        try {
            let workout = new Workout({
                name: req.body.name,
                exercises: [],
                userId: user._id,
                isCompleted: false,
                dateScheduled: date,
                notes: req.body.notes
            });

            await workout.save()
            await user.workouts.push(workout);
            await user.save()
            

            res.json({
                success: true,
                workout: workout
            })            
        } catch(e) {
            res.status(500).json({
                success: false,
                message: e.message
            })
        }
    }



});

//Deleting Workout
router.delete('/',verifyToken, async(req, res) => {
    try {
        const user = await User.findByUsername(req.decoded.username);

        if(user.workouts !== null) {
            let userWorkouts = user.workouts
                var filtered = userWorkouts.filter(function(value, index, arr){ 
                    return value._id != req.body.workoutId;
            });            
        }
 

        const workout = await Workout.findOne({_id: req.body.workoutId})


        //Deleting exercises inside workout
        if(workout.exercises) {

            for(let exerciseId of workout.exercises)
            {
                const exercise = await Exercise.findById(exerciseId);

                //Deleting Sets within Exercises
                if(exercise.sets !== null) {
                    for(let setId of exercise.sets)
                    {
                        await Set.findOneAndDelete({_id: setId});
                    }                    
                }

                await Exercise.findOneAndDelete({_id: exerciseId});
            }            
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


        let workout = await Workout.findByIdAndUpdate({_id: req.body.workoutId}, {
            $set: {
                name: req.body.name, 
                dateScheduled: req.body.dateScheduled,
                notes: req.body.notes                      
            }
        });

    
        await workout.save();

        res.json({
            success: true,
            message: workout
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

        const exercise = await Workout.findByIdAndUpdate(req.body.workoutId, {
            isCompleted: req.body.isCompleted
        })

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