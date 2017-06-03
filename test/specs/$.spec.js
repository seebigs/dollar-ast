
const $AST = require('../../index.js');
const fs = require('fs');
const parse = require('acorn').parse;

const code = fs.readFileSync(__dirname + '/../_code.js', 'utf8');


describe('class knows that it is dollar', (expect) => {
    expect($AST.isDollar).toBe(true);
});

describe('create new instances with the new keyword', (expect) => {
    const $ = new $AST(code);
    const match = $('VariableDeclarator#foo');
    expect(match.length).toBe(1);
    expect(match[0]).toBe(parse(code).body[0]);
});

describe('instance knows that it is dollar', (expect) => {
    const $ = new $AST();
    expect($.isDollar).toBe(true);
    expect($().isDollar).toBe(true);
});
