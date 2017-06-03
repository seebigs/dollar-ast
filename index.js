const parse = require('acorn').parse;
const utils = require('seebigs-utils');

const arrProto = Array.prototype;
const methodFiles = utils.listFiles('./lib');

function $AST (code) {
    code = code || ''; // catch all falsey values

    function $ (selector, context) {
        return new $.fn.init(selector, context);
    }

    $.isDollar = true;

    $.fn = {
        isDollar: true,
        indexOf: arrProto.indexOf,
        push: arrProto.push,
        pop: arrProto.pop,
        shift: arrProto.shift,
        unshift: arrProto.unshift,
        slice: arrProto.slice,
        splice: arrProto.splice, // Makes console.log display selected elements as an Array

        ast: typeof code === 'string' ? parse(code) : code, // need to add parents or use astw (with my PR)
    };

    // add library methods
    methodFiles.forEach(function (filepath) {
        var filename = filepath.split('/').pop().split('.')[0];
        $.fn[filename] = require(filepath);
    });

    $.fn.init = function (selector, context) {
        this.length = 0;

        return this.find(selector, context);
    };

    $.fn.empty = function () {
        if (this.length) {
            for (let i = this.length - 1; i >= 0; i--) {
                delete this[i];
            }
            this.length = 0;
        }
    };

    // Give the init function the $ prototype for later instantiation
    $.fn.init.prototype = $.fn;

    return $;
}

$AST.isDollar = true;

module.$ = new $AST();
module.exports = $AST;
