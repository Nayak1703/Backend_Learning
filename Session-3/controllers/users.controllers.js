const axios = require("axios");

// 1. importing data validating package
const Joi = require('joi');

// 2. importing the validator function to validate the given data using schema we have created
const userValidator = require("../validators/validator.js")

// Define the function to check is client authorize to get response, by accessing the password from environment 
// variable of node.js's process
const verifyAuth = (authorization) => authorization === process.env.PASSWORD;

// 3. now create schema (rules/structure to validate data) using joi, assign the Joi.object() to schema.
// inisde the object() add the keys you will get from client.
// in this case we will get gender and age, now validate there values using method-chaining.
// gender: Should be a string, can contain only 'male' or 'female'.
// age: Should be an integer number and should be between 0 to 100.
// .or('gender', 'age'): At least one key with value between gender and age is required.
const userSearchSchema = Joi.object({
  gender: Joi.string().valid("male", "female"),
  age: Joi.number().integer().min(0).max(100)
}).or("age", "gender")


// fetching all user data using axios handling the error incase of any problem during fetching
const getAllUsers = async (req, res) => {

  // here we are accessing the password provided by client in header from req-object
  // and passing the header as argument to verifyAuth() function
  // if password provided by header is incorrect then it will throw a error: forbidden else give response 
  if (!verifyAuth(req.headers.authorization)) return res.sendStatus(403)

  try {
    const apiData = await axios.get(
      "https://gitlab.crio.do/public_content/node-js-sessions/-/raw/master/users.json"
    );
    const userData = apiData.data;
    res.send(userData.data);
  } catch (error) {
    res.status(505).send({ message: "Problem in fetching data, Retry!" });
  }
};

// fetching user based of specific user's UUID using dynamic-routing
const getUserByUUID = async (req, res) => {
  const { uuid } = req.params;

  if (!verifyAuth(req.headers.authorization)) return res.sendStatus(403)

  try {
    const apiData = await axios.get(
      "https://gitlab.crio.do/public_content/node-js-sessions/-/raw/master/users.json"
    );
    const userData = apiData.data.data;
    const requiedData = userData.find((user) => user.login.uuid === uuid);

    if (requiedData) return res.send(requiedData);
    // res.status(404).send({ message: "Invalid uuid" });
    // if we dont want to send any message with status then used send.Status()
    res.sendStatus(404);
  } catch (error) {
    res.status(505).send({ message: "Problem in fetching data, Retry!" });
  }
};

// =======>  Check session-2's getUserBySearch() validation to see old way of validation  <=======
// Fethcing filtered user based gender and/or age by client.
const getUserBySearch = async (req, res) => {

  if (!verifyAuth(req.headers.authorization)) return res.sendStatus(403)

  let gender = req.query.gender;
  if (gender) gender = gender.toLowerCase()
  const age = req.query.age;

  // Validating using validator function and schema that we have created, if we get any error then
  // error object will have value and if() condition will execute
  // check the validator.js inside validators folder 
  const { error, value } = userValidator(userSearchSchema, { gender, age })
  if (error) return res.status(422).send(error.details[0].message)

  try {

    const apiData = await axios.get(
      "https://gitlab.crio.do/public_content/node-js-sessions/-/raw/master/users.json"
    );
    const userData = apiData.data.data;

    // if client given both gender and age as query
    if (gender && age) {
      const filterData = userData.filter(
        (user) => user.gender === gender && user.dob.age === parseInt(age)
      );
      if (filterData.length) return res.send(filterData);
      res.status(404).send({ message: "Not found" });
    }

    // if client given only gender as query
    else if (gender) {
      const filterData = userData.filter((user) => user.gender === gender);
      if (filterData.length) return res.send(filterData);
      res.status(404).send({ message: "Not found" });
    }

    // if client given only age as query
    else if (age) {
      const filterData = userData.filter(
        (user) => user.dob.age === parseInt(age)
      );
      if (filterData.length) return res.send(filterData);
      res.status(404).send({ message: "Not found" });
    }

    // if client didnt give any query under path /users/search
    else {
      return res
        .status(422)
        .send({
          message: "Missing Search Parameters, search using age and/or gender",
        });
    }
  } catch (error) {
    res.status(505).send({ message: "Problem in fetching data, Retry!" });
  }


}

// exporting the function using comman-js
module.exports = { getAllUsers, getUserByUUID, getUserBySearch };
