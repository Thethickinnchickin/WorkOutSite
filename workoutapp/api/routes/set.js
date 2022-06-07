const express = require('express');
const router = express.Router();
const Workout = require('../models/workout');
const User = require('../models/user');
const Exercise = require('../models/exercise');
const Set = require('../models/set');
const verifyToken = require('../middleware/verify-token');


router.get('/:id', verifyToken, async (req, res) => {
    try {
        let set = await Set.findById(req.params.id);

        res.json({
            success: true,
            set: set
        })
    }catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }



})

//Creating new set for exercise
router.post('/create', verifyToken, async (req, res) => {
    const user = await User.findByUsername(req.decoded.username);
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
        isCompleted: false
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
  
        await Set.findOneAndDelete({_id: req.body.setId});
        
        
        

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
router.put('/', async (req, res) => {
    try {
        if(req.body.updateType === "target")
        {
            const set = await Set.findByIdAndUpdate(req.body.setId, {
                $set: {
                    targetRepAmount: req.body.targetRepAmount,
                    targetWeight: req.body.targetWeight,
                    targetTimeinSeconds: req.body.targetTimeInSeconds                    
                }
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
                actualTimeinSeconds: req.body.actualTimeInSeconds
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


//Changing isCompleted to true or false
router.put('/warmupSet', async (req, res) => {
    try {
        const set = await Set.findByIdAndUpdate(req.body.setId, {
            warmupSet: req.body.warmupSet
        })

        await set.save();

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

//Changing isCompleted to true or false
router.put('/isCompleted', async (req, res) => {
    try {
        const set = await Set.findByIdAndUpdate(req.body.setId, {
            $set: {
                isCompleted: req.body.isCompleted                
            }

        })

        await set.save();

        res.json({
            success: true,
            message: "You have completed this set"
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})






module.exports = router;