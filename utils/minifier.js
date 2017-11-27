const uglify = require('uglify-js');

function minifier (ast, options) {
    let result = {};

    try {
        const convertedAST = uglify.AST_Node.from_mozilla_ast(ast);
        result = uglify.minify(convertedAST, options);
    } catch (e) {
        console.log('Warning: unable to uglify from AST. Must generate to string and re-parse.');
        result = uglify.minify(ast.generate(), options);
    }

    return result.code;
}

module.exports = minifier;
