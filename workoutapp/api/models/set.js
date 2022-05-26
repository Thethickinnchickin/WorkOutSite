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
    exerciseId: {
        type: Schema.Types.ObjectId,
        required: true
    }
});


module.exports = mongoose.model('Set', SetSchema);