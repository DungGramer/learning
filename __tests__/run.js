const { Parser } = require('../src/Parser');

const parser = new Parser();

const program = `
  /**
    * This is a comment
    */
  //  Number
  12
`;

const ast = parser.parse(program);

console.log(JSON.stringify(ast, null, 2));
