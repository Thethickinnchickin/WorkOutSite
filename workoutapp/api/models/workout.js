const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Creating Workout Model

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
    }
});


module.exports = mongoose.model('Workout', WorkoutSchema);