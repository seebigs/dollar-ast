const $AST = require('../../index.js');

describe('replace', function () {

    describe('VariableDeclarator', function (expect) {
        const $ = new $AST('function originalCode (){ let foo = 123; }');
        $('#foo').replace('let bar = 456;');
        const $test = new $AST('function originalCode (){ let bar = 456; }');
        expect($.ast.generate()).toBe($test.ast.generate());
    });

    describe('AssignmentExpression', function (expect) {
        const $ = new $AST('function originalCode (){ foo = 123; }');
        $('#foo').replace('bar = 456;');
        const $test = new $AST('function originalCode (){ bar = 456; }');
        expect($.ast.generate()).toBe($test.ast.generate());
    });

    describe('FunctionExpression', function (expect) {
        const $ = new $AST('function originalCode (){ let x = function foo() {}; }');
        $('#foo').replace('let x = function bar() {}');
        const $test = new $AST('function originalCode (){ let x = function bar() {}; }');
        expect($.ast.generate()).toBe($test.ast.generate());
    });

    describe('FunctionDeclaration', function (expect) {
        const $ = new $AST('function originalCode (){ function foo() {}; }');
        $('#foo').replace('function bar() {}');
        const $test = new $AST('function originalCode (){ function bar() {}; }');
        expect($.ast.generate()).toBe($test.ast.generate());
    });

    describe('CallExpression', function (expect) {
        const $ = new $AST('function originalCode (){ foo(); }');
        $('#foo').replace('bar(1); bar(2);');
        const $test = new $AST('function originalCode (){ bar(1); bar(2); }');
        expect($.ast.generate()).toBe($test.ast.generate());
    });

    describe('CallExpression Arguments', function (expect) {
        const $ = new $AST('function originalCode (){ hello(foo(), bar(3)) }');
        $('#foo').replace('bar(1); bar(2);');
        const $test = new $AST('function originalCode (){ hello(bar(1), bar(2), bar(3)); }');
        expect($.ast.generate()).toBe($test.ast.generate());
    });

    describe('ReturnStatement', function (expect) {
        const $ = new $AST('function originalCode (){ return foo; }');
        $('#foo').replace('function dummy() { return bar; }');
        const $test = new $AST('function originalCode (){ return bar; }');
        expect($.ast.generate()).toBe($test.ast.generate());
    });

    describe('MemberExpression', function (expect) {
        const $ = new $AST('function originalCode (){ foo.x = 123; }');
        $('#foo').replace('bar.y = 456;');
        const $test = new $AST('function originalCode (){ bar.y = 456; }');
        expect($.ast.generate()).toBe($test.ast.generate());
    });

    describe('ExpressionStatement', function (expect) {
        const $ = new $AST('function originalCode (){ foo; }');
        $('#foo').replace('bar;');
        const $test = new $AST('function originalCode (){ bar; }');
        expect($.ast.generate()).toBe($test.ast.generate());
    });

    describe('NewExpression', function (expect) {
        const $ = new $AST('function originalCode (){ new foo(); }');
        $('#foo').replace('new bar();');
        const $test = new $AST('function originalCode (){ new bar(); }');
        expect($.ast.generate()).toBe($test.ast.generate());
    });

    describe('returns dollar', function (expect) {
        const $ = new $AST();
        expect($().replace({}).isDollar).toBe(true);
    });

});
