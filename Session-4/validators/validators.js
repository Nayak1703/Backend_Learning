// validating the data from schema
const getQueryErrors = (schema, data) => {
    const result = schema.validate(data);
    return result;
}

module.exports = getQueryErrors;