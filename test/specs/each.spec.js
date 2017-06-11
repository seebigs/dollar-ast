
const $AST = require('../../index.js');
const fs = require('fs');

const code = fs.readFileSync(__dirname + '/../_code.js', 'utf8');
const $ = new $AST(code);

describe('each', () => {

    describe('iterates over each matched node', function (expect) {
        var matches = '';
        $('FunctionDeclaration').each(function (node, index) {
            matches += node.type + index;
        });
        expect(matches).toBe('FunctionDeclaration0FunctionDeclaration1FunctionDeclaration2');
    });

    describe('returns dollar', function (expect) {
        expect($().each().isDollar).toBe(true);
    });

});
