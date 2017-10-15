
const $AST = require('../../index.js');
const fs = require('fs');

const code = fs.readFileSync(__dirname + '/../_code.js', 'utf8');
const $ = new $AST('function originalCode (){ let me = "awesome" }');

describe('ast', () => {

    describe('default (get)', () => {

        describe('returns raw AST', function (expect) {
            expect($.ast().type).toBe('File');
            expect($().ast().type).toBe('File');
        });

    });

    describe('set', () => {

        let $a = new $AST('function originalCode (){}');

        describe('sets new AST', function (expect) {
            expect($a.ast().type).toBe('File');
            $a.ast.set({ type: 'NEW' });
            expect($a.ast().type).toBe('NEW');
        });

    });

    describe('generate', () => {

        describe('converts AST into code', function (expect) {
            let code = $.ast.generate();
            expect(code).toBe('function originalCode() {\n  let me = "awesome";\n}');
        });

    });

    describe('stringify', () => {

        describe('converts AST into a readable JSON string', function (expect) {
            let str = $.ast.stringify();
            expect(str.indexOf('{\n    "type": "File"')).toBe(0);
        });

        describe('protects against noisy and circular references', function (expect) {
            let str = $().ast.stringify();
            expect(str.indexOf('"_"')).toBe(-1);
        });

    });

    describe('walk', () => {

        describe('walk provides a function as an iterator', function (expect) {
            expect(typeof $.ast.walk).toBe('function');
            expect(typeof $().ast.walk).toBe('function');
        });

    });

});
