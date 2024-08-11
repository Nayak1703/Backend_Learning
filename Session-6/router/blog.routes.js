const Router = require("express").Router()

const { postBlog, getBlogData, getBlogBySearch, deleteBlog, getBlogById, updateBlog } = require("../controllers/blogs.controllers.js")


Router.get("/", getBlogData)
Router.get("/search", getBlogBySearch)
Router.get("/:id", getBlogById)
Router.patch("/:id", updateBlog)
Router.post("/", postBlog)
Router.delete("/:id", deleteBlog)


module.exports = Router;