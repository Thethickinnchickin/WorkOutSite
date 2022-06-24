const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Creating Workout Model

const SetSchema = new Schema({
    targetRepAmount: Number,
    actualRepAmount: Number,
    targetWeight: Number,
    actualWeight: Number,
    targetTimeinSeconds: Number,
    actualTimeinSeconds: Number,
    warmupSet: Boolean,
    targetLoad: Number,
    actualLoad: Number,
    rpe: Number,
    rest: Number,
    exerciseId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    isCompleted: {
        required: true,
        type: Boolean
    }
});


module.exports = mongoose.model('Set', SetSchema);