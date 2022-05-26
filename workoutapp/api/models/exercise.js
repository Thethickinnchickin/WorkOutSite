const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Creating Workout Model

const ExerciseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    sets: [
        {
            type: Schema.ObjectId,
            ref: 'Set'
        }
    ],
    workoutId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    notes: String,
    
});


module.exports = mongoose.model('Exercise', ExerciseSchema);