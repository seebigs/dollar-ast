
const $AST = require('../../index.js');
const fs = require('fs');

const code = fs.readFileSync(__dirname + '/../_code.js', 'utf8');
const $ = new $AST('function originalCode (){}');

describe('ast', () => {

    describe('get', () => {

        describe('returns raw AST', function (expect) {
            expect($.ast.get().type).toBe('Program');
            expect($().ast.get().type).toBe('Program');
        });

    });

    describe('set', () => {

        let $a = new $AST('function originalCode (){}');

        describe('sets new AST', function (expect) {
            expect($a.ast.get().type).toBe('Program');
            $a.ast.set({ type: 'NEW' });
            expect($a.ast.get().type).toBe('NEW');
        });

    });

    describe('stringify', () => {

        describe('converts AST into a readable string', function (expect) {
            let str = $.ast.stringify();
            expect(str.indexOf('{\n    "type": "Program",\n    "start": 0,')).toBe(0);
        });

        describe('protects against noisy and circular references', function (expect) {
            let str = $().ast.stringify();
            expect(str.indexOf('[ ParentNode ]')).not.toBe(-1);
        });

    });

    describe('walk', () => {

        describe('walk provides a function as an iterator', function (expect) {
            expect(typeof $.ast.walk).toBe('function');
            expect(typeof $().ast.walk).toBe('function');
        });

    });

});
