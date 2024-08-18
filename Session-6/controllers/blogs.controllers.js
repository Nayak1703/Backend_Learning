const BlogServices = new require("../services/blog.service.js")

// we have wrap the services of blog inside the class and we are making new object of it. 
const BlogServicesInstance = new BlogServices()

const postBlog = async (req, res) => {
    try {
        const { title, authors, content, publishedAt } = req.body
        const newBlog = await BlogServicesInstance.post({ title, authors, content, publishedAt });
        res.status(201).send(newBlog)
    } catch (err) {
        console.log(err.errors)
        const { message, code } = err;
        if (message)
            return res.send({ code: code, message: message })
        return res.status(404).send({ message: "Problem in adding the data to the database" })
    }

}

// if any req or res object is not in used then it is good-practice to replace req/res by _
const getBlogData = async (_, res) => {
    try {
        res.send(await BlogServicesInstance.getAllData())
    } catch (err) {
        console.log(err)
        res.status(404).send({ message: "Problem in fetching data from the database", error: err })
    }
}

const getBlogById = async (req, res) => {
    try {
        const { id: blogId } = req.params
        const reqBlog = await BlogServicesInstance.getById(blogId)

        if (reqBlog)
            return res.status(200).send(reqBlog)
        return res.status(404).send(`Blog with this ${blogId} could not be found`)
    } catch (err) {
        console.log(err)
        if (err.message.includes("Cast to objectId failed"))
            return res.status(400).send({ message: `Invalid Blog Id: ${blogId}` })
        res.status(404).send("Problem in fetching data from the database")
    }
}

const getBlogBySearch = async (req, res) => {
    const { title, author } = req.query
    console.log(req.query)
    try {
        const reqBlog = await BlogServicesInstance.getBySearch(title, author)
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
        const result = await BlogServicesInstance.updateById(blogId, req.body);
        res.status(200).send(result);
    } catch (error) {
        res.status(404).send({ message: "Problem in updating the blog from websiteBlogs-collection" })
    }
}

const deleteBlog = async (req, res) => {
    try {
        await BlogServicesInstance.deleteById(req.params.id)
        res.sendStatus(204)
    } catch (error) {
        return res.status(404).send({ message: "Problem in deleting the blog from websiteBlogs-collection" })
    }
}



module.exports = { postBlog, getBlogData, getBlogById, getBlogBySearch, updateBlog, deleteBlog }