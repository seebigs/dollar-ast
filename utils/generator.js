const print = require('escodegen').generate;

function generate (ast, options) {
    return print(ast, options);
}

module.exports = generate;
