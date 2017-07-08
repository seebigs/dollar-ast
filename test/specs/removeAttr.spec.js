const $AST = require('../../index.js');

describe('removeAttr', () => {

    describe('sets new attributes', function (expect) {
        const $ = new $AST('function originalCode() { var originalCode = false; }');
        expect($('#originalCode').attr('init.raw')).toBe('false');
        $('#originalCode').removeAttr('init.raw');
        expect($('#originalCode').attr('init.raw')).toBe(void 0);
    });

    describe('returns dollar', function (expect) {
        const $ = new $AST('function originalCode() {}');
        expect($('#originalCode').removeAttr('foo').isDollar).toBe(true);
    });

});
