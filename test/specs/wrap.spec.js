
const $AST = require('../../index.js');
const fs = require('fs');

const code = fs.readFileSync(__dirname + '/../_code.js', 'utf8');
const $ = new $AST('function originalCode (){ foo() }');
// const $ = new $AST('function originalCode (){ hello(foo()) }');
// const $ = new $AST('function originalCode (){ var x = foo; }');
// const $ = new $AST('function originalCode (){ var x = hallo(foo); }');

describe('wrap', () => {

    // describe('wraps matched nodes with the provided code elements', function (expect) {
    //     console.log($.ast.stringify());
    //     console.log();
    //
    //     $('#foo').wrap('___')
    //     // $('#foo').wrap('hello(___)')
    //     // $('#foo').wrap('hello[___]')
    //     // $('#foo').wrap('"___"')
    //     // $('#foo').wrap('try { ___; } catch(e) {}')
    //     // $('#foo').wrap('hello(); ___; hello();')
    //     // console.log( $('[name=foo]').wrap('hello(___)') );
    //     // $('#foo').wrap('(function(){___})()')
    //
    //     // console.log('\n');
    //     // console.log($.ast.stringify());
    //     // console.log('\n-----\n');
    //     // console.log($.ast.generate());
    // });

    // describe('returns dollar', function (expect) {
    //     expect($().wrap({}).isDollar).toBe(true);
    // });

});
