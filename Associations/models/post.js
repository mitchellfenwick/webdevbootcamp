var mongoose = require("mongoose");

// POST - title, content
var postSchema = mongoose.Schema({
    title: String,
    content: String
 });
 module.exports = mongoose.model("Post", postSchema);