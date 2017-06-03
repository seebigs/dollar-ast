const collect = require('../utils/collect.js');

function find (selector, context) {
    // context can be undefined, a node, an array of nodes, or a $ instance (which is an array of nodes)
    // default context is current set of matched nodes or top-level ast node

    if (!selector) {
        return this;
    }

    // console.log(JSON.stringify(this.ast, null, 4));

    // populate matches
    // Mutates!!
    collect.call(this, [this.ast.body[0]]);

    return this;
}

module.exports = find;
