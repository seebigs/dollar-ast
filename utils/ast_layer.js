const arrSlice = Array.prototype.slice;
const escodegen = require('escodegen');
const generator = require('./generator.js');
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

    try {
        code = parser(rawCode, {
            // locations: true,
            ranges: true,
            onComment: comments,
            onToken: tokens,
        });

    } catch (err) {
        if (typeof rawCode === 'string') {
            printAdditionalErrorContext(rawCode, err);
        }
        throw new SyntaxError(err.message);
    }

    return {
        code: code,
        comments: comments,
        tokens: tokens,
    };
}

function printAdditionalErrorContext (rawCode, err) {
    const errFirstLine = err.stack.split('\n')[0];
    let errLine = errFirstLine.substr(errFirstLine.lastIndexOf('(') + 1);
    const errLineSplit = errLine.split(':');
    errLine = parseInt(errLineSplit[0]);
    const errCol = parseInt(errLineSplit[1]);
    const badLine = rawCode.split('\n')[errLine - 1];
    console.log('Error parsing code at:');
    console.log(badLine.substring(errCol - 100, errCol + 100));
    console.log();
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

    function stringify (obj) {
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
        set,
        stringify,
        walk,
    };
}

module.exports = AstLayer;
