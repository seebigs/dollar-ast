
const $AST = require('../../index.js');
const fs = require('fs');

const code = fs.readFileSync(__dirname + '/../_code.js', 'utf8');
const $ = new $AST('function originalCode (){}');

describe('after', () => {

    describe('insert new content of various types', function (expect) {
        let testCode = 'let x = 99;';
        expect($('VariableDeclarator').length).toBe(0);

        $('FunctionDeclaration').after([
            {
                type: 'VariableDeclaration',
                start: '0', end: '11',
                declarations: [
                    {
                        type: 'VariableDeclarator',
                    }
                ],
            },
            testCode,
            [testCode],
            function () {
                return testCode
            },
        ]);

        expect($('VariableDeclarator').length).toBe(4);

        $.ast.get().body.forEach(function (node, index) {
            if (index === 0) {
                expect(node.type).toBe('FunctionDeclaration');
            } else {
                expect(node.type).toBe('VariableDeclaration');
            }
        });
    });

    describe('returns dollar', function (expect) {
        expect($().after({}).isDollar).toBe(true);
    });

});
