const $AST = require('../../index.js');

describe('attr', () => {

    describe('sets new attributes', function (expect) {
        const $ = new $AST('function originalCode() {}');
        $('#originalCode').attr('little.boy.blue', 'horny');
        expect($.ast.get().body[0].little.boy.blue).toBe('horny');
    });

    describe('overrides existing attributes', function (expect) {
        const $ = new $AST('function originalCode() {}');
        expect($('#originalCode').attr('id.name')).toBe('originalCode');
        $('#originalCode').attr('id.name', 'yoMomma');
        expect($('#yoMomma').attr('id.name')).toBe('yoMomma');
    });

    describe('returns dollar (when setting)', function (expect) {
        const $ = new $AST('function originalCode() {}');
        expect($('#originalCode').attr('foo', 'bar').isDollar).toBe(true);
    });

});
