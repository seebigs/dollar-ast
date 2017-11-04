const arrProto = Array.prototype;
const AstLayer = require('./utils/ast.js');
const utils = require('seebigs-utils');

const methodFiles = utils.listFiles(__dirname + '/lib');

function $AST (code) {
    code = code || ''; // catch all falsey values

    let ast = new AstLayer(code);

    function $ (selector, context) {
        return new $.fn.init(selector, context);
    }

    $.ast = ast;
    $.generate = ast.generate;
    $.isDollar = true;

    $.fn = {
        ast: ast,
        isDollar: true,
        indexOf: arrProto.indexOf,
        push: arrProto.push,
        pop: arrProto.pop,
        shift: arrProto.shift,
        unshift: arrProto.unshift,
        reverse: arrProto.reverse,
        slice: arrProto.slice,
        splice: arrProto.splice,
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

module.exports = $AST;
