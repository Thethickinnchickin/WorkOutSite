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
    ]
});


module.exports = mongoose.model('Exercise', ExerciseSchema);