const print = require('babel-generator').default;

function generate (ast, options) {
    return print(ast, options).code;
}

module.exports = generate;
