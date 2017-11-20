const $AST = require('../../index.js');
const fs = require('fs');

const code = fs.readFileSync(__dirname + '/../_code.js', 'utf8');
const codeParsed = fs.readFileSync(__dirname + '/../_code_parsed.json', 'utf8');

describe('$', function () {

    describe('create new instances with the new keyword', (expect) => {
        const $a = new $AST('let foo = 123;');
        let matchA = $a('#foo');
        expect(matchA.length).toBe(1);

        let errorThrown;
        try {
            const $b = $AST('let bar = 456;');
        } catch(e) {
            errorThrown = e.message;
        }
        expect(errorThrown).toBe('Use new $AST()');
    });

    describe('can be constructed with existing AST', (expect) => {
        const ast = JSON.parse(codeParsed);
        expect(new $AST(ast).generate()).toBe(new $AST(code).generate());
    });

    describe('instance knows that it is dollar', (expect) => {
        const $ = new $AST('');
        expect($.isDollar).toBe(true);
        expect($().isDollar).toBe(true);
    });

    describe('class knows that it is dollar', (expect) => {
        expect($AST.isDollar).toBe(true);
    });

});
