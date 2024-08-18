const mongoose = require("mongoose")
// importing light-weight validator function for strings.
const validatorPack = require("validator");

/* 
    const blogSchema = new mongoose.Schema({
        title: {type: String, required: true, unique: true},
        authors: [String],
        content: String,
        publishedAt: Date,
    }, {timestamps: true})
*/


// ====>    This is the nested-schema.    <=====

// Note: This Schema-vaildation you see (type, maxLength, requied, etc...) is the inbuild validation of mongoose.
// this validation happen right before data is pushed / update inside the Database.

// The flow of data till now: 
// 1. Client Authentication, 2. Joi Validation, 3. Schema Validation.

// when we create a schema, mongoose will automatically attach the _id to it.  
// so to avoid this we have to write -- {_id: false} -- as a option in schema.

// There is 1 more problem in this schema that client can enter invalid email if the 
// value is string and under 50 charater.
// so to avoid this issue, we can validate using custome -- RegEx -- or another validation package called -- validator --.
// This is the light-weight package that only validates the string datatype.
// -- validator -- package have very limited validation features then Joi-package.

/* 
    // this is without custome-validators

    const authorSchame = new mongoose.Schema(
        {
            // if we want to add more than 1 validation, than we can write validation in this format.
            fullname: { type: String, maxLenght: 25 },
            twitterHandle: { type: String },
            email: { type: String, required: true,  },
              image: { type: String }
       },
        { _id: false }
    )

*/

// since we are using custom-validator we are going to use third-party "validator" package to validate the email 
// inside "validate" key which is given by mongoose. 
// the value of "validate" key is object and inside the object it have 2 key-value pair.
//  1. validator: function that take value enter by client and validate using RegEx or third-party library (in this case validator)
//                this will return true if validation is successful otherwise false.
//  2. message: if the validation return false this message will get return.
// you can refer this for more info: https://mongoosejs.com/docs/validation.html 

const authorSchame = new mongoose.Schema(
    {
        fullName: { type: String, maxLenght: 25 },
        twitterHandle: { type: String },
        email: {
            type: String,
            maxLenght: 50,
            validate: {
                validator: (value) => validatorPack.isEmail(value),     // this will always return true or false
                // message: (props) => `${props.value} is not a valid email`
                message: ({ value }) => `${value} is not a valid Email`
            }
        },
        image: {
            type: String,
            validate: {
                validator: (value) => validatorPack.isURL(value),
                message: ({ value }) => `${value} is not a valid Url`
            }
        }
    },
    { _id: false }
)



const blogSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    authors: [authorSchame],
    content: String,
    publishedAt: Date,
}, { timestamps: true })





const blogModel = mongoose.model("Blog", blogSchema, "websiteBlogs")

module.exports = blogModel;