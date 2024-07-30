const mongoose = require("mongoose")

/*  // 1.
    const blogSchema = new mongoose.Schema({
        title: String,
        authors: [String],
        content: String,
        publishedAt: Date
    });
*/


/* 
    // 2.
    // {timestamps: true}: this will insert 2 key-value pair
    // createdAt: date and time when the document created
    // updatedAt: data and time when the document last updated. 

    const blogSchema = new mongoose.Schema({
        title: String,
        authors: [String],
        content: String,
        publishedAt: Date
    }, { timestamps: true });
*/


// 3.
// We can write complex schema, here we want that our title should be unique and should not be empty. 
// If Documents have dupilcate title before applying the {unique: true}, then unique will not work.

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    authors: [String],
    content: String,
    publishedAt: Date
}, { timestamps: true });

const blogModel = mongoose.model("Blog", blogSchema, "websiteBlogs")

module.exports = blogModel