const $AST = require('../../index.js');
const fs = require('fs');

const code = fs.readFileSync(__dirname + '/../_code.js', 'utf8');
const $ = new $AST(code);

describe('empty', () => {

    describe('clears all child nodes from each match', function (expect) {
        $('#publicMethod').add('#privateMethod').empty();
        let expected = '\nlet foo = 123,\n    bar = 456;\n\nfunction privateMethod() {}\n\nfunction publicMethod(one, two) {}\n\nmodule.exports = {\n    publicMethod,\n};\n';
        expect($.ast.generate()).toBe(expected);
    });

    describe('returns dollar', function (expect) {
        let $ = new $AST();
        expect($().rename({}).isDollar).toBe(true);
    });

});
