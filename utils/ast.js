const generator = require('./generator.js');
const parse = require('./parse.js');
const jsonifier = require('./jsonifier.js');
const walker = require('./walker.js');

function get () {
    return this.__ast;
}

function set (code) {
    let parsedCode = parse(code);
    this.walk = walker(parsedCode);
    this.walk(); // add parent, prev, etc. to the tree
    return this.__ast = parsedCode;
}

function generate (options) {
    return generator(this.__ast, options);
}

function stringify (obj) {
    return jsonifier(obj || this.__ast);
}

function AstLayer (code) {
    this.__ast = {};

    this.get = get;
    this.set = set;

    this.generate = generate;
    this.stringify = stringify;

    this.walk = function(){};

    this.set(code);
}

module.exports = AstLayer;
