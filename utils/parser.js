const parser = require('acorn').parse;

function parse (code, options) {
    return typeof code === 'string' ? parser(code, options) : code;
}

module.exports = parse;
