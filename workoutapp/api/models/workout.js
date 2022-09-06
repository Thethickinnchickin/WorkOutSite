const { Date } = require('core-js');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

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
},
{ toJSON: { virtuals: true },
 toObject: { virtuals: true } });

WorkoutSchema.virtual('isToday').get(function() {
    if (moment().diff(this.dateScheduled, 'days') === 0) {
        return true;
    }
    return false;
})


module.exports = mongoose.model('Workout', WorkoutSchema);