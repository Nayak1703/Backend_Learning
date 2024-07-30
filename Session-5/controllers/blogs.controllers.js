// importing the model that we have created, because model in mongoose provide list of interface to 
// access/ manipulate the database. https://mongoosejs.com/docs/api/model.html 
// here i have written Blog , B is capital because it a convention (good practice)
const Blog = require("../models/blog.model.js")


// ======> GET-Request <=======

const getBlogData = async (req, res) => {
    try {
        res.send(await Blog.find())
    } catch (error) {
        res.status(404).send("Problem in fetching data from the database")
    }
}

// Get blog by id.
// always remember that when we send error message to client from backend, if client is sending some invaid request.
// then always send required response dont give detailed info about the error client is doing, beacuse
// there is chance that hacker is trying to do something.
const getBlogById = async (req, res) => {
    try {
        // {id: blogId} ->  object destructuring and also renaming the id
        const { id: blogId } = req.params
        const reqBlog = await Blog.findById(blogId)
        // there may be a possibility, that the format of blogId is correct but details related blogId is not founded.
        // therefore send 404 if blog related to given blogId is not founded
        if (reqBlog)
            return res.send(reqBlog)
        return res.status(404).send(`Blog with this ${blogId} could not be found`)
    } catch (error) {
        console.log(error)
        // there is a possibility that given blogId format is incorrect then send 400
        if (error.message.includes("Cast to objectId failed"))
            return res.status(400).send({ message: `Invalid Blog Id: ${blogId}` })
        res.status(404).send("Problem in fetching data from the database")
    }
}


// ======> POST Request <=======

/*
    // ------ 1. Hardcoded way ------

    // this is asynchronus function will handle the post-request made by client for /blogs
    // data is not coming from client but we are hard-coded the data.
    const postBlog = async (req, res) => {
        try {
            // Model.create() : give interface to insert the document to the collection we have define
            const newBlog = await Blog.create({
                title: "Travel blog on India",
                authors: ["demo-name", "test-name"],
                content: "Spirtually rich country",
                publishAt: null
            });

            res.status(201).send(newBlog)
        } catch (error) {
            // if any error occur during creating the document then log the error
            console.log("Problem in creating the document", error)
        }
    }
*/

// ------- Data coming from client side --------

// When any data coming from client side we should always vaildate the data before adding 
// it to the database
const postBlog = async (req, res) => {
    try {
        // req.body return the data which is given by client, in this case we are parsing the JSON data
        // but req.body returns undefine because express dont parse req.body by default. so we have to tell
        // express to parse the request-body with the help of middleware which is given by express.
        // if ur experss version is >=4.16 u can use the middleware funtion i.e. app.use(express.json()), 
        // else you have to use external package called "bodyParser" to parse the request-body inside the express-server.

        // To use bodyParser -> download: "npm i body-parser" -> import: "const bodyParser = require(body-parser)" 
        // -> replace app.use(express.json()): app.use(bodyParser.json()) 

        // i have added the app.use(express.json()) in index.js file, you will see that we have succesfully
        // log the request-body 
        console.log(req.body)
        // return res.send("here")
        // only accepting required data from client and sending it to DB.
        const { title, authors, content, publishedAt } = req.body

        // method-1 
        // {title, authors, content, publishedAt} === {title: req.body.title, authors: req.body.authors, content: req.body.content, publishedAt: req.body.publishedAt}

        const newBlog = await Blog.create({ title, authors, content, publishedAt });

        // method-2
        // This is the another way to create Document and add to the DB
        // new Blog({ title, authors, content, publishedAt })  ->  will create Document.
        // .save()  ->  This function deals with DB and add this document to the DB, if we dont write .save() Document will not get added to DB
        // if we dont write await here, our Document will get insert to our DB but send the response as empty object to the client.
        // beacuse save() return promise and we didnt wait to complete the promise and directly send response.

        // const newBlog = await new Blog({ title, authors, content, publishedAt }).save()

        res.status(201).send(newBlog)
    } catch (error) {
        const { message, code } = error;
        if (code)
            return res.send({ code: code, message: message })
        return res.status(404).send({ message: "Problem in adding the data to the database" })
    }
}



// ======> UPDATE Request <=======

// This will find the document by id and update the value of Original Document by new value given by clinet in
// request-body.
// when we dont write {new: true} then in backend database will get updated but the Document as response we are 
// sending to client is not updated. so to also update the response to client add options {new: true} 
// you can see the mongoose added createdAt and updatedAt key to the document 

const updateBlog = async (req, res) => {
    const { id: blogId } = req.params;

    try {
        const result = await Blog.findByIdAndUpdate(blogId, req.body, { new: true })
        res.status(200).send(result);
    } catch (error) {
        res.status(404).send({ message: "Problem in updating the blog from websiteBlogs-collection" })
    }
}


// ======> DELETE Request <=======

// Model.findByIdAndDelete() used to the delete the Document based on its _ID
// 204 status-code: N-content, That server dont want to send body to client.
const deleteBlog = async (req, res) => {
    try {
        await Blog.findByIdAndDelete(req.params.id)
        res.sendStatus(204)
    } catch (error) {
        return res.status(404).send({ message: "Problem in deleting the blog from websiteBlogs-collection" })
    }
}

module.exports = { postBlog, getBlogData, deleteBlog, getBlogById, updateBlog }