const Router = require("express").Router()

// imported controllers-function for the routes
const { postBlog, getBlogData, deleteBlog, getBlogById, updateBlog } = require("../controllers/blogs.controllers.js")


// GET, POST, PUT, PATCH, DELETE, etc request-methods are the guidelines of Http and try to follow them as much as possible.
// but remember all this request-method can be done by using single request-method.
// example To send response we will use GET and to Create, Update, Delete i can use POST method, just i have to 
// change the url and everything remain same.

// In this case
// Router.get("/", getBlogData)         ->  Router.post("/", getBlogData)
// Router.get("/:blogId", getBlogById)  ->  Router.post("/:id", getBlogById)
// Router.post("/", postBlog)           ->  Router.post("/post", postBlog)
// Router.patch("/", updateBlog)        ->  Router.post("/update", updateBlog)
// Router.delete("/:id", deleteBlog)    ->  Router.post("/delete/:id", deleteBlog)

// So, you may find the backend-server where most of the request is done using POST. so dont frek out


// This is the GET-Request and give result of all the blog inside the websiteBlog-collection
// inside the website database
Router.get("/", getBlogData)

// This will give the blog of specific ID given by client.
Router.get("/:id", getBlogById)

// it will execute when client send the post-request to the /blogs
Router.post("/", postBlog)

// PUT method: To replace/update entire Document
// PATCH method: To replace/update specific part of Document
Router.patch("/:id", updateBlog)

// it will execute when client send delete-requesr to the /blogs, this will delete the blog by id.
// the client will have access of the id of the blog becuase when we render blog on frontend we pass the id of the blog
// vanilla js : id-name, React : key
Router.delete("/:id", deleteBlog);


module.exports = Router