const currencies = require("../apiData.json");


// function will execute on /currencies or /currencies?min_value=0.01 (query-parameter) url
const getCurrencies = (req, res) => {
  const { min_value } = req.query;

  if (min_value) {
    const requiredObj = currencies.data.filter(
      ({ min_size }) => parseFloat(min_size) === parseFloat(min_value)
    );

    if (!isNaN(min_value)) {
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


// function will execute on /currencies/:symbol (path-parameter)
const getCurrencyBySymbol = (req, res) => {
  const { symbol } = req.params;
  const requiredSymbol = currencies.data.find(
    ({ id }) => id.toLowerCase() === symbol.toLowerCase()
  );

  if (requiredSymbol) return res.send(requiredSymbol);
  res.status(404).send({ message: "Invalid currency Symbol" });
};

module.exports = { getCurrencies, getCurrencyBySymbol };
