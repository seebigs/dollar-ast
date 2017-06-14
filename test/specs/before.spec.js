
const $AST = require('../../index.js');
const fs = require('fs');

const code = fs.readFileSync(__dirname + '/../_code.js', 'utf8');
const $ = new $AST('function originalCode (){}');

describe('before', () => {

    describe('insert new content of various types', function (expect) {
        let testCode = 'let x = 99;';
        expect($('VariableDeclarator').length).toBe(0);

        $('FunctionDeclaration').before([
            { type: 'VariableDeclarator' },
            testCode,
            [testCode],
            function () {
                return testCode
            },
        ]);

        expect($('VariableDeclarator').length).toBe(4);

        $.ast.get().body.forEach(function (node, index) {
            if (index < 4) {
                expect(node.type).toBe('VariableDeclarator');
            } else {
                expect(node.type).toBe('FunctionDeclaration');
            }
        });
    });

    describe('returns dollar', function (expect) {
        expect($().before({}).isDollar).toBe(true);
    });

});
