const mongoose = require("mongoose");

const yourDate = new Date()


const hypebeastschema = mongoose.Schema({
    title: String,
    url: String,
    date: { type: Date, default: yourDate.toISOString().split('T')[0]}
});

module.exports = hypebeastschema 