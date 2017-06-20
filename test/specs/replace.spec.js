
const $AST = require('../../index.js');
const fs = require('fs');

const code = fs.readFileSync(__dirname + '/../_code.js', 'utf8');
// const $ = new $AST('function originalCode (){ foo() }');
const $ = new $AST('function originalCode (){ hello(foo()) }');
// const $ = new $AST('function originalCode (){ var foo = x; }');
// const $ = new $AST('function originalCode (){ var x = hallo(foo); }');

describe('replace', () => {

    describe('', function (expect) {
        expect($('#foo').length).toBe(1);
        expect($('#bar').length).toBe(0);

        $('#foo').replace('bar(none);');
        // $('Identifier[name=foo]').replace('bar(none);');

        expect($('#foo').length).toBe(0);
        expect($('#bar').length).toBe(1);
    });

    describe('returns dollar', function (expect) {
        expect($().wrap({}).isDollar).toBe(true);
    });

});
