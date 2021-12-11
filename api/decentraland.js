const mongoose = require("mongoose");

const decentralandSchema = mongoose.Schema({
    title: String,
    preview: String,
    atricleurl: String,
});

module.exports = decentralandSchema 