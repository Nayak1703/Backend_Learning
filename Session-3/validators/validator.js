// This function will take schema which we have build and data which we have provided
// validate using joi's internal function called validate()
// this function will return 2 info in a object format.
// 1. data provided to this function -> {{value: {gender: 'male', age: '49'}}} 
// 2. info about any error if it recieve after validating the data, if there is no error then value of error
//    will be empty.
// eg:{
//   value: { gender: 'male', age: '12a' },
//   error: [Error [ValidationError]: "age" must be a number] {
//     _original: { gender: 'male', age: '12a' },
//     details: [ [Object] ]
//   }
// }

const getQueryErrors = (schema, data) => {
    const result = schema.validate(data);
    console.log(result);
    return result;
}

module.exports = getQueryErrors