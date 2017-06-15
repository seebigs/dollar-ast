// https://github.com/estools/escodegen/wiki/API
const escodegen = require('escodegen');

function generate (ast, options) {
    return escodegen.generate(ast, options);
}

module.exports = generate;
