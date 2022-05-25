const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Creating Workout Model

const SetSchema = new Schema({
    repAmount: Number,
    weight: Number,
    timeinSeconds: Number
});


module.exports = mongoose.model('Set', SetSchema);