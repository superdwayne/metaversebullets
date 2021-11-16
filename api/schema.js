const mongoose = require("mongoose");

const articlesSchema = mongoose.Schema({
    title: String,
    preview: String,
    atricleurl: String,
});

module.exports = articlesSchema 