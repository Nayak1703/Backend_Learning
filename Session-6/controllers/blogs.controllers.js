const Blog = require("../models/blog.model.js")

const postBlog = async (req, res) => {
    try {
        const { title, authors, content, publishedAt } = req.body
        const newBlog = await Blog.create({ title, authors, content, publishedAt });
        res.status(201).send(newBlog)
    } catch (err) {
        console.log(err.errors)
        const { message, code } = err;
        if (message)
            return res.send({ code: code, message: message })
        return res.status(404).send({ message: "Problem in adding the data to the database" })
    }

}

const getBlogData = async (req, res) => {
    try {
        res.send(await Blog.find())
    } catch (err) {
        res.status(404).send({ message: "Problem in fetching data from the database", error: err })
    }
}

const getBlogById = async (req, res) => {
    try {
        const { id: blogId } = req.params
        const reqBlog = await Blog.findById(blogId)

        if (reqBlog)
            return res.status(200).send(reqBlog)
        return res.status(404).send(`Blog with this ${blogId} could not be found`)
    } catch (err) {
        if (err.message.includes("Cast to objectId failed"))
            return res.status(400).send({ message: `Invalid Blog Id: ${blogId}` })
        res.status(404).send("Problem in fetching data from the database")
    }
}

const getBlogBySearch = async (req, res) => {
    const { title, author } = req.query
    console.log(req.query)
    try {
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
        const reqBlog = await Blog.find({
            $or: [
                { title: { $regex: new RegExp(title), $options: 'i' } },
                { authors: { $elemMatch: { email: author } } }
            ]
        })
        if (reqBlog)
            return res.send(reqBlog)
        return res.status(404).send(`Blog with this title: ${title} could not be found`)
    } catch (err) {
        console.log(err)
        res.status(404).send("Problem in fetching data by search from the database")
    }
}

const updateBlog = async (req, res) => {
    const { id: blogId } = req.params

    try {
        const result = await Blog.findByIdAndUpdate(blogId, req.body, { new: true });
        res.status(200).send(result);
    } catch (error) {
        res.status(404).send({ message: "Problem in updating the blog from websiteBlogs-collection" })
    }
}

const deleteBlog = async (req, res) => {
    try {
        await Blog.findByIdAndDelete(req.params.id)
        res.sendStatus(204)
    } catch (error) {
        return res.status(404).send({ message: "Problem in deleting the blog from websiteBlogs-collection" })
    }
}



module.exports = { postBlog, getBlogData, getBlogById, getBlogBySearch, updateBlog, deleteBlog }