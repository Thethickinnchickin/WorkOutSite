const { Date } = require('core-js');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Workout Model

const WorkoutSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    exercises: [
        {
            type: Schema.ObjectId,
            ref: 'Exercise'
        }
    ],
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    isCompleted: {
        type: Boolean,
        required: true
    },
    dateScheduled: {
        type: Date,
        required: true
    },
    notes: String
});


module.exports = mongoose.model('Workout', WorkoutSchema);