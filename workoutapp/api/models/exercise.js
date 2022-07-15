const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Exercise Model

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
    warmUpExercise: {
        type: Boolean,
        required: true
    },

    notes: String,
    isCompleted: {
        type: Boolean,
        required: true
    }
    
});


module.exports = mongoose.model('Exercise', ExerciseSchema);