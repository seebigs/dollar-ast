
const $AST = require('../../index.js');
const fs = require('fs');

const code = fs.readFileSync(__dirname + '/../_code.js', 'utf8');
const $ = new $AST(code);

describe('eq', () => {

    describe('finds positive index', function (expect) {
        var matches = $('FunctionDeclaration').eq(2);
        expect(matches.length).toBe(1);
        expect(matches[0] && matches[0].id.name).toBe('publicMethod');
    });

    describe('returns dollar', function (expect) {
        expect($().each().isDollar).toBe(true);
    });

});
