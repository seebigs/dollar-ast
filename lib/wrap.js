const AstLayer = require('../utils/ast.js');
const insert = require('../utils/insert.js');

const wrapperIdentifier = '___';

function matchesWrapperIdentifier (node) {
    return (node.type === 'Identifier' && node.name === wrapperIdentifier) ||
        (node.type === 'Literal' && node.value === wrapperIdentifier);
}

function wrap (code) {
    this.each(function (match) {
        let wrapperAST = new AstLayer(code);

        wrapperAST.walk(function (node) {
            if (matchesWrapperIdentifier(node)) {
                if (node.raw === '"___"') {
                    let str = new AstLayer(match).generate();
                    node.value = str;
                    node.raw = '"' + str + '"';
                } else {
                    node._._containerParent[node._._containerKey] = match;
                }
            }
        });

        let wrapperProgram = wrapperAST.get();
        insert.replace([match], wrapperProgram.body);
    });

    return this;
}

module.exports = wrap;
