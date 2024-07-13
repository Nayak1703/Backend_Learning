const axios = require("axios");

// fetching all user data using axios handling the error incase of any problem during fetching
const getAllUsers = async (req, res) => {
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


// Fethcing filtered user based gender and/or age by client. 
const getUserBySearch = async (req, res) => {
  const { gender, age } = req.query;

  // validating query if it is enter correctly, if not send response according to the error
  // does client entered gender, if yes then validate only male or female
  if (gender && !["male", "female"].includes(gender))
    return res.status(400).send({ message: "Invalid Gender" });
  // does client entered age, if yes then validate only number 
  // isNaN(value) will convert string to number if neccessary and then check is this value is not-a-number
  if (age && isNaN(age))
    return res.status(400).send({ message: "Invalid Age" });

  try {
    const apiData = await axios.get(
      "https://gitlab.crio.do/public_content/node-js-sessions/-/raw/master/users.json"
    );
    const userData = apiData.data.data;

    // if client given both gender and age as query
    if (gender && age) {
      const filterData = userData.filter((user) => user.gender === gender && user.dob.age === parseInt(age));
      if (filterData.length)
        return res.send(filterData);
      res.status(404).send({ message: "Not found" });
    }
    // if client given only gender as query 
    else if (gender && !age) {
      const filterData = userData.filter((user) => user.gender === gender);
      if (filterData.length)
        return res.send(filterData);
      res.status(404).send({ message: "Not found" });
    }
    // if client given only age as query  
    else if (age && !gender) {
      const filterData = userData.filter((user) => user.dob.age === parseInt(age));
      if (filterData.length) return res.send(filterData);
      res.status(404).send({ message: "Not found" });
    }
    // if client didnt give any query under path /users/search
    else {
      return res
        .status(400)
        .send({ message: "Please Enter valid query to get filtered data" });
    }
  } catch (error) {
    res.status(505).send({ message: "Problem in fetching data, Retry!" });
  }
};

// exporting the function using comman-js
module.exports = { getAllUsers, getUserByUUID, getUserBySearch };
