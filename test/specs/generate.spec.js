const $AST = require('../../index.js');

describe('converts tree to valid code (as a string)', function (expect) {
    const $ = new $AST('function originalCode (){ let foo = 123; }');
    expect($.generate()).toBe('function originalCode() {\n    let foo = 123;\n}');
});
