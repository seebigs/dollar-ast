
const $AST = require('../../index.js');
const fs = require('fs');

const code = fs.readFileSync(__dirname + '/../_code.js', 'utf8');
const $ = new $AST(code);

describe('not', () => {

    describe('removes nodes that match', function (expect) {
        var matches = $('FunctionDeclaration').not('#publicMethod');
        expect(matches.length).toBe(2);
    });

    describe('returns dollar', function (expect) {
        expect($().not('#foo').isDollar).toBe(true);
    });

});
