 const Blog = require("../models/blog.model.js")

// wrapping all the blog's service function inside the class. 
class BlogServices {
    post = (blogObj) => Blog.create(blogObj)

    getAllData = () => Blog.find()


    getById = (blogId) => Blog.findById(blogId)

    // $regex -> it is the mongoDB operator and it allow us to to perform pattern matching using regEx.
    //           by this regEx will take the value of client's title and it return all the blogs were its title include
    //           client's title value in it.
    //           actual-title: "travel blog to puri", client-given-title: "pu" since pu in present inside
    //           actual-title so it will return this blog.
    // new RegExp(title) -> will create the RegEx of the title given by client
    //                      ex: javascript = /javascript/
    // $options: 'i' -> will allow client to enter case-insensitive title.
    // $elemMatch -> It is the mongoDB operator which help us to find the element inside the array.

    // $or: atleast 1 query should be passed by the user to return the blog.
    getBySearch = (title, author) => Blog.find({
        $or: [
            { title: { $regex: new RegExp(title), $options: 'i' } },
            { authors: { $elemMatch: { email: author } } }
        ]
    })


    updateById = (blogId, body) => Blog.findByIdAndUpdate(blogId, body, { new: true });

    deleteById = (id) => Blog.findByIdAndDelete(id);
}

module.exports = BlogServices