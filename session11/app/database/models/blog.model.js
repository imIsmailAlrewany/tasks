const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    title: { type: String, required: true, trim: true, unique: true },
    content: { type: String, required: true, trim: true },
}, {timeStamps: true});

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;