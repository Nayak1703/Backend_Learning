const http = require("http"); // In node.js we used require for importing the module.
const PORT = 8082;
const apiData = require("./apiData.json");

// #########    1    #########

// Creating http server, whenever our server get request from outside, the callback function inside the createServer()
// will get executed.
// callback function inside the createServer() take 2 arguments request & response.
// request & response both value's are in object format which have all the details releated to the
// request we are reciving or response we are sending

/*
    const server = http.createServer((req,res)=>{

    })
*/

// #########    2    #########

// When user vist the web-app (localhost:8082) it means user is sending request to the web-app
/*
    // ======> Basic Syntax <======

    const server = http.createServer((req,res)=>{
        // In Js new Date() will give Data object in javascript
        const localDate = new Date().toLocaleDateString();
        const localTime = new Date().toLocaleTimeString();

        // logging msg for testing purpose, that we have recieved the request from the user
        console.log("request received");

        // since we are not sending any response or ending the request from the user, the web-app will get stuck 
        // (hung-up) to avoid that issue we can use write() & end() method from req-object
    }) 
*/

// #########    3    #########

// Lets send the response using write() & end() method of "res" parameter which we are getting from http module
/*
    // ======> res.write(), res.end(), chainFormat <======

    const server = http.createServer((req,res)=>{
        // logging msg for testing purpose, that we have recieved the request from the user
        console.log("request received");

        // using res.write() method to send response from backend, res.write() only takes string argument in it
           res.write("Response from backend server")

        // using res.end() to end the response, if we dont add res.end() the web-app will get stuck (hung-up)
           res.end()

        // after sending the response properly we can see that status-code: 200 OK on network tab of web-app
        // or POSTMAN  

        // OR 

        // we can also write in chain format to shortern the syntax, this will send & end the response in one line.
        res.end("response from backend server")

    })


    // ======> res.writeHead() <======

    const server = http.createServer((req,res)=>{

        // To send the additional-info / Meta-Data about the data we are sending through response, from 
        // backend-server we are using res.writeHead() method.
        // res.writeHead() takes 3 parameter:
            // status-code: has to be number, (we can send any status-code as a reponse from backend as per the request)
            // status-messgae (optional): should be string,
            // header (optional): should be object, by default http sends 4 header, we can add more standard-headers
            //                    which is given on site or we can also make our own custom header.
            //                    you can see how to customize the header based on the data-type you want to send 
            //                    (https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types)     

           res.writeHead(201,"Have successfully sent the response", {"Content-Type":"text/plain", "Default-head":"Testing"})


           res.write("Response from backend server")
           res.end()

        // OR 

        // we can also write in chain format to shorter the syntax.
            res
            .writeHead(201,"Have successfully sent the response", {"Content-Type":"text/plain", "Default-head":"Testing"})
            .end("response from backend server")
    })    
*/

// #########    4    #########

/*
    const server = http.createServer((req,res)=>{
        const localDate = new Date().toLocaleDateString();
        const localTime = new Date().toLocaleTimeString();

        // res.writeHead(404,"What are you trying to find", {"Content-Type":"text/plain", "Default-head":"Testing"})

        // ====> sending plain-text as a response <====
        // res.writeHead(201,"Have successfully sent the response", {"Content-Type":"text/plain", "Default-head":"Testing"})
        // res.write(`${localDate} ${localTime}`)

        // ====> sending HTML-element as a response <==== 
        // u will see the type of reponse-dropdown in postman will change to HTML because of the header (text/html)
        // res.writeHead(201,{"Content-Type": "text/html"})
        // res.write(`<h1 style="color:red">${localDate} ${localTime}</h1>`)

        // ====> sending JSON as a response <==== 
        res.writeHead(201,{"Content-type":"application/json"})
        const obj = {
            name:"Yash Nayak",
            age: 23,
            city: "mumbai",
            date: localDate,
            time: localTime
        }
        res.write(JSON.stringify(obj))  // since res.write() only takes strings, so we have converted Obj to string
        res.end()
    })    
*/

// #########    5    #########

// Now we have seen how to send MetaData, Data, and how to end the response, when user sent the request
// the request is sent when user land or refresh the home-page i.e https://localhost:8082 which is the base of the url
// there is only 1 route till now by-default that is root (/).
// https://localhost:8082 or https://localhost:8082/ is the same thing and localhost:8082 is domain
// Since we are sending data only on base-url, if we add endpoints (Refers to the path portion of a URL) Like
// (https://localhost:8082/student) or query-parameter (https://localhost:8082/student/result?pass=true)
// in url, we will get response of base-url.
// Beacuse we have not set which data should go from backend-server to the client-side on those url-routes

// Now let see how can we do that.
// To access those url routes we have a propertie called req.url which we get from req obj which is a
// (argument of callback-function) inside http.createServer()

/*
    const server = http.createServer((req, res) => {
        // you will get (/) only if there is no endpoints or queryselector in Url, otherwise u will get a string of
        // parameters after base-url
        console.log(req.url); 

        const obj = {
            name:"Yash Nayak",
            age: 23,
            city: "mumbai",
        }

        // since req.url extract the parameters of client-side url and return it in string format
        // we can use value of req.url and send response according to the request made by client-side url
        if (req.url === "/yash") {
            res.writeHead(201, {"Content-type":"application/json"})
            res.write(JSON.stringify(obj))
        } else if(req.url === "/radhaKrsna") {
            res.writeHead(201, {"Content-type": "text/html"})
            res.write(`<h1>Radha-Rani Ki Jai</h1>`)
        } else {
            res.writeHead(404, {"Content-type": "text/plain"})
            res.write(`Always grateful and remember to lord`)
        }
        res.end()
    });
*/

// #########    5    #########

const server = http.createServer((req, res) => {
  const urlParams = req.url;
  console.log(urlParams);

  switch (urlParams) {
    case "/":
      res.writeHead(201, { "Content-type": "text/html" });
      res.write("<h1>Currency Database</h1>");
      break;
    case "/currencies":
      res
        .writeHead(200, { "Content-type": "application/json" })
        .write(JSON.stringify(apiData.data));
      break;
    default:
      // chaining
      res.writeHead(404, {"Content-type":"application/json"}).end(JSON.stringify({message: `Not found`}));
  }
    // Add a new route /currencies/:symbol -> returns the object for the symbol with status code 200, 
    // and if object not found, then 404 and response {message: “Invalid Symbol”}
    // Example - A call at /currencies/inr -> {"id": "INR", "name": "Indian Rupee","min_size": "0.01000000"}
    // If we try to do this task using node and its module http, it will make code complicated, which is not good
    // it will get difficult to do dynamic-routing in node's http module, so we will solve this by using Express.js in
    // next session
  res.end();
});

// #########    6    #########

// To access the backend-server we are using listen(), It will help us to give parameters that are
// port (optional): Specifies the port we want to listen to
// hostname (optional): Specifies the IP address we want to listen to
// backlog (optional): Specifies the max length of the queue of pending connections. Default 511
// callback (optional): Specifies a function to be executed when the listener has been added
// the server from outside

// server.listen(PORT)

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
