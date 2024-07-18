const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deltaSchema = new Schema({
    hour: Number,
    day: Number,
    week: Number,
    month: Number,
    quarter: Number,
    year: Number
}, { _id: false });

const stockSchema = new Schema({
    code: { type: String, required: true },
    rate: { type: Number, required: true },
    volume: { type: Number, required: true },
    cap: { type: Number, required: true },
    delta: { type: deltaSchema, required: true }
});

const Stock = mongoose.model('Stock', stockSchema);

module.exports = Stock;