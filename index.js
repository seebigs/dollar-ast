const parse = require('acorn').parse;
const utils = require('seebigs-utils');

const arrProto = Array.prototype;
const methodFiles = utils.listFiles('./lib');
const walker = require('./utils/walker.js');

function $AST (code) {
    code = code || ''; // catch all falsey values

    let ast = typeof code === 'string' ? parse(code) : code; // need to add parents or use astw (with my PR)
    let walk = walker(ast);

    function $ (selector, context) {
        return new $.fn.init(selector, context);
    }

    $.ast = ast;
    $.isDollar = true;
    $.walk = walk;

    $.fn = {
        ast,
        isDollar: true,
        indexOf: arrProto.indexOf,
        push: arrProto.push,
        pop: arrProto.pop,
        shift: arrProto.shift,
        unshift: arrProto.unshift,
        reverse: arrProto.reverse,
        slice: arrProto.slice,
        splice: arrProto.splice, // Makes console.log display selected elements as an Array
        walk,
    };

    // add library methods
    methodFiles.forEach(function (filepath) {
        var filename = filepath.split('/').pop().split('.')[0];
        $.fn[filename] = require(filepath);
    });

    $.fn.forEach = $.fn.each;

    $.fn.init = function (selector, context) {
        this.zero();
        return this.concat(this.find(selector, context));
    };

    // Give the init function the $ prototype for later instantiation
    $.fn.init.prototype = $.fn;

    return $;
}

$AST.isDollar = true;

module.$ = new $AST();
module.exports = $AST;
