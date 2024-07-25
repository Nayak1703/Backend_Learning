// MongoDB is schema less, so there is chances that our database inside mongoDB can get pollute
// by inconsistent data (the value or data-type of value that we dont want in our database)

// So, we have to define the schema using the help of Mongoose ODM, due to this we can give structure, 
// validates the value, etc... in our document (object)

// importing the mongoose
const mongoose = require("mongoose")



// ====> Creating the schema <====

// here we are using Constructor-function "Schema" which is present inside mongoose.
// mongoose will check these validation internally when we add/update the document (object)  
// we are making schema for blog-document.  

const blogSchema = new mongoose.Schema({
    title: String,      // title should be the string.
    authors: [String],  // authors should be array of string.
    content: String,    // content should be the string.
    publishedAt: Date   // publishedAt should be the Date data-type which is supported by BSON
});



// ====> Wrapping schema inside the model <====

// Till now we have to define that schema blog-document belongs. 
// To interact with MongoDB and its databases, we have to use mongoose-model.
// Through mongoose-model we can wrap schema, define the collection-name and send it to the website-DB.
// model provide the interface to the database for querying, updating, deleting records, etc. 

// here model takes 3 parameter:
// 1: model-name (first-letter capital because of naming-convention), 2: schema, 3 (optional): collection-name
// if we dont write collection-name then mogoose will give model-name as collection-name

const blogModel = mongoose.model("Blog", blogSchema, "websiteBlogs")



module.exports = blogModel;