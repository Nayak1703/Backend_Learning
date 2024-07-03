// we are importing express which is not a default module of node.js, and "app" is the instance of express. means
// all the functionality of the express we have assign it to app.

const express = require("express");
const app = express();
const PORT = 8082;
const currencies = require("./apiData.json");



// ======>  1. Adding Routes (see how simple it is)  <======

/*
    // here app -> instance of express,  get -> request-method in this case we are doing GET request
    app.get("/",(req,res)=>{
        // res.send() will send the data from the server, in express.js we dont have to mention type of data we are
        // sending in headers (meta-data about the response), just like we have to do in node's HTTP module. 
        // express will automatically identify the type of the data.

        // We can also send standard-headers or custome headers in express by res.header()
        // we can also write header in chain-format
        
        // here we have mention that we are sending text/plain which is string, so browser will consider
        // and give us response's data as string
        res.header({region:"IND", "Content-Type":"text/plain"}).send("<h1>Currency Database</h1>") 
    })

    app.get("/currencies",(req,res)=>{
        // In node's HTTP module, we can send data only in string format so we have to convert JSON, HTML, etc...
        // into string, But here in res.send() we can send data of any Type, we dont have to convert.
        res.send(currencies.data)
    })

    // If the url's route or request-method is other tha we have define our backend_server (express) will give 
    // Status-code "404 - Not found" by its own. we dont have to specify like we have to do in node's http module.


    // If you go to the headers of response we have recieved In Postman, we have 7-headers by default.
    // X-Powered-By: Express -> given by express.  others are redable 
*/



// ======>  2. Adding Dynamic-Path & Query-Parameter    <======

/*
    // #######  Dynamic-Path  ########

        app.get("/", (req, res) => {
            res.send("<h1>Currency Database</h1>");
        });

        // here we want response of only that object from array that is mention in endpoints.
        // example: 
        // /currencies/inr -> object that have ID:inr, & symbol = inr
        // /currencies/usd -> object that have ID:usd & symbol = usd
        // : -> it indicates that it is dynamic-route
        // symbol -> inplace of "symbol" we can write anything here, but it should make sense

        app.get("/currencies/:symbol", (req, res) => {
            // req.params.symbol -> to get the access of given symbol in url
            // console.log(req.params)  -> give object of parameters
            console.log(req.params.symbol);

            // requiredSymbol -> have a object from array i.e equal to "symbol" with the help of find() 
            // find() will itterate from each element (object) from apiData.json's array
            const requiredSymbol = currencies.data.find( 
                // {id} -> object destructuring, asking give me id from the itterated element which is object
                ({ id }) => id.toLowerCase() === req.params.symbol.toLowerCase()
            );

            // suppose user have given invalid-value for symbol like: inr1, 1nr, 32324, etc...;
            // then the value of "requiredSymbol" will be "undefined", if so then send the response of the 
            // status-code of 404 and message related to it.
            // to send the status-code use res.status()
            // make sure whenever you have to send the response based certain condition always use return 
            // in this case if we dont write return then res.send() will try to execute 2 time.
            //  1. res.status(404).send({ message: "Invalid currency symbol" })
            //  2. res.send(requiredSymbol)
            // This means we are sending response more than 1 time which is wrong Due to this the backup server  
            // will crash with error: Cannot set headers after they are sent to the client

            if (requiredSymbol === undefined) 
                res.status(404).send({ message: "Invalid currency symbol" });
            res.send(requiredSymbol);
        });
*/

/*
    // #######  Query-Parameter  ########
    
        // The /currencies endpoint returns all objects from the apiData.json file.
        // Example of a JSON object in the file: {"id": "AED", "name": "United Arab Emirates Dirham", "min_value": "0.01"}
        // Now we want to get data of all the objects of apiData.json file which have [min_value = num] and value 
        // of num is given by client and it will be string data-type. (min_value = '13' / 'yash' / '10.1' / etc)
        // For example, to request all the objects with a min_value of 0.01, you would use the URL:
        // http://localhost:8082/currencies?min_value=0.01
        // http://localhost:8082: The Protocol, domain and port.
        // /currencies: The endpoint to get the currency data.
        // ?min_value=0.01: The query parameter indicating the minimum value to filter the data.
        // we can add more query by giving "&" symbol example:
        // http://localhost:8082/currencies?min_value=0.01&demoQuery=value
        // we dont need to write separate like app.get(/currencies?min_value=0.01) because we are asking to  
        // filter the data that we are getting from /currencies. 
        // if we dont give any Query-parameter under /currencies then we will get reposne we set for 
        // /currencies path

        app.get("/", (req, res) => {
            res.send("<h1>Currency Database</h1>")
        })

        app.get("/currencies/:symbol", (req, res) => {
            const { symbol } = req.params;
            const requiredSymbol = currencies.data.find(({ id }) => id.toLowerCase() === symbol.toLowerCase())

            if (requiredSymbol)
                return res.send(requiredSymbol)
            res.status(404).send({ message: "Invalid currency Symbol" })
        })

        app.get("/currencies", (req, res) => {
            // if http://localhost:8082/currencies?min_value=yash
            // console.log(req.query)      // {min_value: 'yash'}

            // if http://localhost:8082/currencies?min_value=0.01
            // console.log(req.query)      // {min_value: '0.01'}

            // This object destructuring, it allows us to extract the value of "min_value" from req.query (object) 
            // and assign them to a varibale with the same name "min_value"
            const { min_value } = req.query

            // if client is sending the query-paramter then only run code of query parameter other wise send
            // respone of /currencies
            if (min_value) {
                // filtering currencies.data's array
                // parseFloat(value) convert string to float
                // parseFloat('adkda') -> NaN,    parseFloat('10') -> 10,    parseFloat('0.01') -> 0.01
                // parseFloat('1a1') -> NaN,    parseFloat('12aq') -> 12 (it will trim aq)
                const filterData = currencies.data.filter(({ min_size }) => parseFloat(min_size) === parseFloat(min_value))

                // isNaN('adf') -> True,    isNaN(NaN) -> True,     isNaN(32) -> False,     isNaN(0.01) -> False

                // in this condition we are checking if passed value to min_size is number, since parseFloat('12aq') -> 12
                // to solve this issue, we have done parseFloat(min_value).toString() === min_value
                // suppose min_value = "12abc",
                // parseFloat(min_value)  ->  12
                // parseFloat(min_value).toString()  ->  '12'
                // parseFloat(min_value).toString() === min_value  ->  '12' === '12abc'  ->  false
                if (!isNaN(parseFloat(min_value)) && parseFloat(min_value).toString() === min_value) {
                    if (filterData.length) {
                        // sending the response if we got any obj that satisfy the filter condition
                        return res.send(filterData)
                    }     
                    else {
                        // this response will get send if it is number but we didnt get any obj that satisfy 
                        // the filter condition
                        return res.status(404).send({ message: "No match" })
                    }
                 
                } 
                // this response will get send when client have not entered the number
                return res.status(404).send({ message: "Number Expected" })
            }

            // this response will get send when client have not given any query-parameter
            if(Object.keys(req.query).length === 0)
                return res.send(currencies.data)

            // this response will get send when client have enter invalid query-parameter which we have not define
            res.status(404).send({ message: "Invalid Query parameter" })
        })
*/



// ======>  3. Cobmine 1,2  <======

app.get("/", (req, res) => {
    res.send('<h1>Currency Database</h1>')
})

app.get('/currencies', (req, res) => {
    const { min_value } = req.query;

    if (min_value) {
        const requiredObj = currencies.data.filter(({ min_size }) => parseFloat(min_size) === parseFloat(min_value))

        if (!isNaN(parseFloat(min_value)) && parseFloat(min_value).toString() === min_value) {
            if (requiredObj.length)
                return res.send(requiredObj)
            else
                return res.status(404).send({ message: "Match not found" })
        }
        return res.status(404).send({ message: "Number Expected inside query parameter" })
    }

    if (Object.keys(req.query).length === 0)
        return res.send(currencies.data)

    res.status(404).send({ message: "Invalid Query parameter" })
})

app.get('/currencies/:symbol', (req, res) => {
    const { symbol } = req.params;
    const requiredSymbol = currencies.data.find(({ id }) => id.toLowerCase() === symbol.toLowerCase())

    if (requiredSymbol)
        return res.send(requiredSymbol)
    res.status(404).send({ message: "Invalid currency Symbol" })
})



// #######      See the Index.js file      #######


// lets listen the our backend server using express
app.listen(PORT, () => {
    console.log(`The Server is running on port: ${PORT}`);
});
