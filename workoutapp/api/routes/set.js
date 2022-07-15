const express = require('express');
const router = express.Router();
const Workout = require('../models/workout');
const User = require('../models/user');
const Exercise = require('../models/exercise');
const Set = require('../models/set');
const verifyToken = require('../middleware/verify-token');
const cleanSetInput = require('../helpers/setInput')


//Getting set by id
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
    try {
        const user = await User.findByUsername(req.decoded.username);
        const exercise = await Exercise.findById(req.body.exerciseId);

        if(req.body.duplicate) {
            let foundSet = await Set.findById(req.body.setId);
            const newSet = await new Set({
                targetRepAmount: foundSet.targetRepAmount,
                actualRepAmount: null,
                exerciseId: exercise._id,
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
            });
            exercise.sets.push(newSet);
            await newSet.save();
            await exercise.save()
            await user.save()
            
        
            res.json({
                success: true,
                set: newSet
            })
        } else {


            const set = await new Set({
                targetRepAmount: req.body.targetRepAmount,
                actualRepAmount: null,
                exerciseId: exercise._id,
                targetWeight: req.body.targetWeight,
                actualWeight: null,
                targetTimeinSeconds: req.body.targetTimeinSeconds,
                actualTimeinSeconds: null,
                warmupSet: req.body.warmupSet,
                isCompleted: false,
                targetLoad: req.body.targetLoad,
                actualLoad: null,
                rpe: req.body.rpe,
                rest: req.body.rest,
            });     
            exercise.sets.push(set);
            await set.save();
            await exercise.save()
            await user.save()
            
    
            res.json({
                success: true,
                exercise: exercise
            })      
        }



    } catch (err) {
        res.json({
            success: false,
            message: err.message
        })
    }
    

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

//Updating Set for user targets
router.put('/', async (req, res) => {
    try {
        if(req.body.updateType === "target")
        {
            const updatedSet = cleanSetInput(req.body);

            const set = await Set.findByIdAndUpdate(req.body.setId, {
                $set: {
                    targetRepAmount: req.body.targetRepAmount,
                    targetWeight: req.body.targetWeight,
                    targetTimeinSeconds: req.body.targetTimeInSeconds,
                    targetLoad: req.body.targetLoad,
                    rpe: req.body.rpe,
                    rest: req.body.rest,  
                    warmupSet: req.body.warmupSet                
                }
            }); 
            await set.save();

            res.json({
                success: true,
                message: "Successfully updates set for target"
            })
        } else {
            const updatedSet = cleanSetInput(req.body);

            const set = await Set.findByIdAndUpdate(updatedSet.setId, {
                actualRepAmount: updatedSet.actualRepAmount,
                actualWeight: updatedSet.actualWeight,
                actualTimeinSeconds: updatedSet.actualTimeInSeconds,
                actualLoad: updatedSet.actualLoad,
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