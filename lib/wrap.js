const AstLayer = require('../utils/ast.js');
const insert = require('../utils/insert.js');

const wrapperIdentifier = '___';

function matchesWrapperIdentifier (node) {
    return (node.type === 'Identifier' && node.name === wrapperIdentifier) ||
        (node.type === 'DirectiveLiteral' && node.value === wrapperIdentifier);
}

function wrap (code) {
    this.each(function (match) {
        let useDirectives = false;
        let wrapperAST = new AstLayer(code);

        wrapperAST.walk(function (node) {
            if (node.type === 'Identifier' && node.name === wrapperIdentifier) {
                node._._containerParent[node._._containerKey] = match;
            } else if (node.type === 'DirectiveLiteral' && node.value === wrapperIdentifier) {
                useDirectives = true;
                let str = new AstLayer(match).generate();
                node.value = str;
                node.extra.rawValue = str;
                node.extra.raw = '"' + str + '"';
                node.loc = match.loc;
            }
        });

        let wrapperProgram = wrapperAST();
        insert.replace([match], useDirectives ? wrapperProgram.program.directives : wrapperProgram.program.body);
    });

    return this;
}

module.exports = wrap;
