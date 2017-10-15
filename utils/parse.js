const parser = require('babylon').parse;

function parse (code) {
    return typeof code === 'string' ? parser(code) : code;
}

module.exports = parse;
