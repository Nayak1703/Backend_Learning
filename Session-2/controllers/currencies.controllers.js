// if you see the name of this file currencies.controllers.js
// this is naming convention to write file name in controllers
// convention -> coder generally follow this pattern to write file name in controllers

const currencies = require("../apiData.json");


const homePage = (req, res) => {
  res.send("<h1>Currency Database</h1>");
};

const getCurrencies = (req, res) => {
  const { min_value } = req.query;

  if (min_value) {
    const requiredObj = currencies.data.filter(
      ({ min_size }) => parseFloat(min_size) === parseFloat(min_value)
    );

    if (
      !isNaN(parseFloat(min_value)) &&
      parseFloat(min_value).toString() === min_value
    ) {
      if (requiredObj.length) return res.send(requiredObj);
      else return res.status(404).send({ message: "Match not found" });
    }
    return res
      .status(404)
      .send({ message: "Number Expected inside query parameter" });
  }

  if (Object.keys(req.query).length === 0) return res.send(currencies.data);

  res.status(404).send({ message: "Invalid Query parameter" });
};

const getCurrencyBySymbol = (req, res) => {
  const { symbol } = req.params;
  const requiredSymbol = currencies.data.find(
    ({ id }) => id.toLowerCase() === symbol.toLowerCase()
  );

  if (requiredSymbol) return res.send(requiredSymbol);
  res.status(404).send({ message: "Invalid currency Symbol" });
};



// exporting the functions

// default-export in node.js
// module.export = function-name, variable-name, class-name, etc... 

// named-export in node.js
module.exports = {homePage, getCurrencies, getCurrencyBySymbol}