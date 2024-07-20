// Importing apiData.json for json data.
const currencies = require("../apiData.json");


// Sending the response of objects where value of min_value provided by client is same as min_value. 
const getCurrencies = (req, res) => {
    const { min_value } = req.query

    if (min_value) {
        const requiredObj = currencies.data.filter(({ min_size }) => parseFloat(min_size) === parseFloat(min_value))

        if (!isNaN(min_value)) {
            if (requiredObj.length)
                return res.send(requiredObj)
            else
                return res.status(404).send({ message: "Match not found" })
        }
        return res.status(404).send({ message: "Number Expected inside query parameter" })
    }

    if (Object.keys(req.query).length === 0)
        return res.send(currencies.data)

    res.status(404).send({ message: "Invalid Query parameter" });
}


// Sending the response of a object as soon as symbol (provided by client) matches with id of the object.
const getCurrencyBySymbol = (req, res) => {
    const { symbol } = req.params;
    const requiredSymbol = currencies.data.find(({ id }) => id.toLowerCase() === symbol.toLowerCase());

    if (requiredSymbol)
        return res.send(requiredSymbol);
    res.status(404).send({ message: "Invalid currency Symbol" });
}


module.exports = { getCurrencies, getCurrencyBySymbol }