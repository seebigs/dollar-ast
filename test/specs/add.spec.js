
const $AST = require('../../index.js');
const fs = require('fs');

const code = fs.readFileSync(__dirname + '/../_code.js', 'utf8');
const $ = new $AST(code);

describe('add', () => {

    describe('add new nodes by string with context', function (expect) {
        var matches = $('FunctionDeclaration').add('VariableDeclaration', 'BlockStatement');
        expect(matches.length).toBe(4);
    });

    describe('returns dollar', function (expect) {
        expect($().add('#foo').isDollar).toBe(true);
    });

});
