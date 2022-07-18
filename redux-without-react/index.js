const { compose } = require("redux");


const repeatChar = (string) => string.repeat(3);
const upperCase = string => string.toUpperCase();
const embolden = string => string.bold();

const mergeStrings = compose(embolden, upperCase, repeatChar);

console.log(mergeStrings("hello"));