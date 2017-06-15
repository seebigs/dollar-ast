const parser = require('acorn').parse;

function parse (code) {
    return typeof code === 'string' ? parser(code) : code;
}

module.exports = parse;
