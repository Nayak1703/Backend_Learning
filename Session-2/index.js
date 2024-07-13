// The code in index_old.js is becoming bulky and cluttered, especially as the number of routes increases
// This makes the code harder to read and maintain.
// To avoid clutter and improve readability, we will use a controllers folder.
// We will define all the route handler functions (callback) in separate files within the controllers folder.
// we have name them controllers because the file inside the controllers folder is controlling
// the responses we are sending to the client.
// Then, we will import these functions into index.js and use them.

const express = require("express");
const app = express();
const PORT = 8082;

// importing functions which is named-export from currencies.controllers.js file
const {
    homePage,
    getCurrencies,
    getCurrencyBySymbol,
} = require("./controllers/currencies.controllers.js");
const {
    getAllUsers,
    getUserByUUID,
    getUserBySearch,
} = require("./controllers/users.controllers.js");

// As you can see these function is so much clean and readable
app.get("/", homePage);

app.get("/currencies", getCurrencies);

app.get("/currencies/:symbol", getCurrencyBySymbol);



// Activity user routes
app.get("/users", getAllUsers);

// we also have to takecare how we placed the app.get() so that we get all our responses correctly based on requests.

/*
    // Lets consider these 2 link:

    GET http://localhost:8082/users/55322486-4169-4554-98ec-5882450c637e:

        - when we send the request to this link, it will execute app.get("/users/:uuid", getUserByUUID)
        - because express will consider "55322486-4169-4554-98ec-5882450c637e" as a value of uuid (dynamic-route)
        - which is right "55322486-4169-4554-98ec-5882450c637e" is the value of UUID we are giving as a request

    GET http://localhost:8082/users/search?age=49&female=male:

        - when we send the request to this link, it will execute app.get("/users/:uuid", getUserByUUID)
        - beacuse express will consider "search" as a value of uuid (dynamic-route) because we have placed
          app.get("/users/:uuid", getUserByUUID);   above   app.get("/users/search", getUserBySearch);
          First-Come-First-serve
        - which is giving us wrong-response based on client's request 
        - we are defining different route called "search" and under that "search" we are giving 
          query-parameter for filtered-data
        - To get correct response we just have to placed 
          app.get("/users/search", getUserBySearch);    above   app.get("/users/:uuid", getUserByUUID);

        - If we switch the placed and then send request on link: http://localhost:8082/users/search?age=49&female=male

        - Express will first go to app.get("/users/search", getUserBySearch) and check the path.
          if path matches (in this case yes)then it will execute the function.

        - if we send request to http://localhost:8082/users/55322486-4169-4554-98ec-5882450c637e then first express will
          go to app.get("/users/search", getUserBySearch) and check if path is matching, in this case no
          then express will go to app.get("/users/:uuid", getUserByUUID) and check if path is matching, in this case yes.
          so express will execute this function.
          

    // The placement of the app.get()

        app.get("/users/:uuid", getUserByUUID);

        app.get("/users/search", getUserBySearch);

    // Basically we have to adjust the placement of the app.get() function such that it satisfy all the valid-request
       send by client.
*/

app.get("/users/search", getUserBySearch);

app.get("/users/:uuid", getUserByUUID);

// lets listen the our backend server using express
app.listen(PORT, () => {
    console.log(`The Server is running on port: ${PORT}`);
});
