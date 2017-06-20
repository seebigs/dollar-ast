
const $AST = require('../../index.js');
const fs = require('fs');

const code = fs.readFileSync(__dirname + '/../_code.js', 'utf8');
const $ = new $AST(code);

describe('closest', () => {

    describe('matches ancestors by string', function (expect) {
        var match = $('ReturnStatement').closest('FunctionDeclaration');
        expect(match.length).toBe(2);
        expect(match[0] && match[0].id.name).toBe('privateMethod');
        expect(match[1] && match[1].id.name).toBe('publicMethod');
    });

    describe('matches self', function (expect) {
        var match = $('FunctionDeclaration').closest('#inner');
        expect(match.length).toBe(1);
        expect(match[0] && match[0].id.name).toBe('inner');
    });

    describe('returns dollar', function (expect) {
        expect($().closest().isDollar).toBe(true, 'with undefined');
        expect($().closest('#foo').isDollar).toBe(true, 'with string');
    });

});
