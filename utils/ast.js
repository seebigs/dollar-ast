const escodegen = require('escodegen');
const generator = require('./generator.js');
const parse = require('./parse.js');
const jsonifier = require('./jsonifier.js');
const walker = require('./walker.js');

function AstLayer (code) {

    function ast () {
        return ast.__ast;
    }

    ast.__ast = {};

    function set (code) {
        let comments = [];
        let tokens = [];
        let parsedCode = parse(code, {
            ranges: true,
            onComment: comments,
            onToken: tokens,
        });
        escodegen.attachComments(parsedCode, comments, tokens);
        ast.walk = walker(parsedCode);
        ast.walk(); // add parent to the tree
        return ast.__ast = parsedCode;
    }

    function generate (options) {
        options = options || { comment: true };
        return generator(ast.__ast, options);
    }

    function stringify (obj) {
        return jsonifier(obj || ast.__ast);
    }

    ast.set = set;
    ast.generate = generate;
    ast.stringify = stringify;
    ast.walk = function(){};

    ast.set(code);

    return ast;
}

module.exports = AstLayer;
