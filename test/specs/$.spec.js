
const $AST = require('../../index.js');

describe('$', function () {

    describe('create new instances with the new keyword', (expect) => {
        const $a = new $AST('let foo = 123;');
        let matchA = $a('#foo');
        expect(matchA.length).toBe(1);
        expect(matchA[0].type).toBe('VariableDeclarator');

        const $b = new $AST('let bar = 456;');
        let matchB = $b('#foo');
        expect(matchB.length).toBe(0);
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
