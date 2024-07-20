const axios = require("axios");

// verifying the authentication of the client and sending all the users as response
const getAllUsers = async (req, res) => {
    try {
        const apiData = await axios.get("https://gitlab.crio.do/public_content/node-js-sessions/-/raw/master/users.json")
        const userData = apiData.data;
        res.send(userData)
    } catch (error) {
        res.status(505).send({ message: "Problem in fetching data, Retry!" })
    }
}


// verifying the authentication of the client and sending the user based on uuid as response
const getUserByUUID = async (req, res) => {

    const { uuid } = req.params;

    try {
        const apiData = await axios.get("https://gitlab.crio.do/public_content/node-js-sessions/-/raw/master/users.json")
        const userData = apiData.data.data;
        const requireData = userData.find((user) => user.login.uuid === uuid);

        if (requireData)
            return res.send(requireData)
        res.sendStatus(404);
    } catch (error) {
        console.log(error)
        res.status(505).send({ message: "Problem in fetching data, Retry!" })
    }
}

// verifying the authentication of the client and sending all the users which satisfy the query-parameter
// as response
const getUserBySearch = async (req, res) => {
    let gender = req.query.gender;
    if (gender)
        gender = req.query.gender.toLowerCase();
    const age = req.query.age;


    try {
        const apiData = await axios.get("https://gitlab.crio.do/public_content/node-js-sessions/-/raw/master/users.json")
        const userData = apiData.data.data;

        if (gender && age) {
            const filterData = userData.filter((user) => user.gender === gender && user.dob.age === parseInt(age));
            if (filterData.length)
                return res.send(filterData);
            res.status(404).send({ message: "Not found" });
        }

        else if (age) {
            const filterData = userData.filter((user) => user.dob.age === parseInt(age));
            if (filterData.length)
                return res.send(filterData);
            res.status(404).send({ message: "Not found" });
        }

        else if (gender) {
            const filterData = userData.filter((user) => user.gender === gender);
            if (filterData.length)
                return res.send(filterData);
            res.status(404).send({ message: "Not found" })
        }
    } catch (error) {
        console.log(error)
        res.status(505).send({ message: "Problem in fetching data, Retry!" })
    }
}

module.exports = { getAllUsers, getUserByUUID, getUserBySearch }