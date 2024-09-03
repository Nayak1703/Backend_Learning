const validateData = (schema, data) => {
    const result = schema.validate(data);
    return result;
}
module.exports = validateData;