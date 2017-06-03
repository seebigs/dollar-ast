
const $AST = require('../../index.js');
const fs = require('fs');

const code = fs.readFileSync(__dirname + '/../_code.js', 'utf8');


describe('', (expect) => {
    const $ = new $AST(code);
    expect(typeof $('VariableDeclarator#foo').find).toBe('function');
});
