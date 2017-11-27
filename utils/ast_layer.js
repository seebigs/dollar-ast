const arrSlice = Array.prototype.slice;
const escodegen = require('escodegen');
const generator = require('./generator.js');
const minifier = require('./minifier.js');
const parser = require('./parser.js');
const jsonifier = require('./jsonifier.js');
const walker = require('./walker.js');

/**
 * @param {String|AST} rawCode the code to be parsed or the pre-parsed AST
 */
function parse (rawCode) {
    let code = {};
    let comments = [];
    let tokens = [];

    code = parser(rawCode, {
        // locations: true,
        ranges: true,
        onComment: comments,
        onToken: tokens,
    });

    return {
        code: code,
        comments: comments,
        tokens: tokens,
    };
}

function AstLayer (code) {
    let __ast = {};

    function ast () {
        return __ast;
    }

    function set (rawCode) {
        rawCode = rawCode || ''; // catch all falsey values
        let comments = [];
        let tokens = [];
        let parsed = parse(rawCode);
        escodegen.attachComments(parsed.code, parsed.comments, parsed.tokens);
        walk(); // add parent refs to the tree
        return __ast = parsed.code;
    }

    function generate (options) {
        options = options || { comment: true };
        return generator(__ast, options);
    }

    function minify (options) {
        options = options || {};
        return minifier(__ast, options);
    }

    function toString (obj) {
        return jsonifier(obj || __ast);
    }

    function walk () {
        return walker(__ast).apply(this, arrSlice.apply(arguments));
    }

    // initialize with code from constructor if passed
    if (code) {
        set(code);
    }

    return {
        ast,
        generate,
        minify,
        set,
        toString,
        walk,
    };
}

module.exports = AstLayer;
