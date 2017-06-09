
const $AST = require('../../index.js');
const fs = require('fs');

const code = fs.readFileSync(__dirname + '/../_code.js', 'utf8');

describe('find', (expect) => {
    const $ = new $AST(code);
    console.log(JSON.stringify($.ast, null, 4));
    console.log();
    // expect(typeof $('VariableDeclarator#foo').find).toBe('function');
    // $('VariableDeclarator#foo')
    // $('VariableDeclaration.let')
    // $('FunctionDeclaration')
    // $('#foo')
    $('.let')
});
