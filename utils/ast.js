const parse = require('acorn').parse;
const stringifier = require('./stringifier.js');
const walker = require('./walker.js');

function get () {
    return this.__ast;
}

function set (code) {
    let parsedCode = typeof code === 'string' ? parse(code) : code;
    this.walk = walker(parsedCode);
    this.walk(); // add parent, prev, etc. to the tree
    return this.__ast = parsedCode;
}

function stringify (obj) {
    return stringifier(obj || this.__ast);
}

function AstLayer (code) {
    this.__ast = {};

    this.get = get;
    this.set = set;
    this.stringify = stringify;
    this.walk = function(){};

    this.set(code);
}

module.exports = AstLayer;
