
const $AST = require('../../index.js');
const fs = require('fs');

const code = fs.readFileSync(__dirname + '/../_code.js', 'utf8');
const $ = new $AST('function originalCode (){ foo() }');

describe('wrap', () => {

    describe('insert new content of various types', function (expect) {
        // $('#foo').wrap('hello(___)')
        // $('#foo').wrap('bar[___]')
        // $('#foo').wrap('try {___} catch(e) {}')
    });

    describe('returns dollar', function (expect) {
        expect($().wrap({}).isDollar).toBe(true);
    });

});
